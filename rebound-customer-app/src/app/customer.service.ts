import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer, CustomerAuthResponse, CustomerPasswordResetResponse } from './models/customerAuth.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8000/api/customer';
  private currentCustomerSubject = new BehaviorSubject<Customer | null>(null);
  private tokenKey = 'auth_token';
  private customerKey = 'currentCustomer';

  constructor(private http: HttpClient) {
    // Load stored customer data from session storage
    const customerData = sessionStorage.getItem(this.customerKey);
    if (customerData) {
      this.currentCustomerSubject.next(JSON.parse(customerData)); // Set customer data from sessionStorage
    }
  }

  // Load stored customer data on service initialization
  private loadStoredCustomer(): void {
    const storedCustomer = sessionStorage.getItem(this.customerKey);
    const storedToken = sessionStorage.getItem(this.tokenKey);

    if (storedCustomer && storedToken) {
      this.currentCustomerSubject.next(JSON.parse(storedCustomer)); // Update with session data
    }
  }

  // Get HTTP Headers with Auth Token
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem(this.tokenKey);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Sign Up
  signUp(customerData: Partial<Customer>): Observable<CustomerAuthResponse> {
    return this.http.post<CustomerAuthResponse>(`${this.apiUrl}/signup`, customerData)
      .pipe(
        tap(this.handleAuthResponse.bind(this)),
        catchError(this.handleError)
      );
  }

  // Login
  login(email: string, password: string): Observable<CustomerAuthResponse> {
    const loginData = { email, password };

    return this.http
      .post<CustomerAuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap((response) => {
          if (response.token) {
            // Store the token and customer data in sessionStorage
            sessionStorage.setItem(this.tokenKey, response.token);
            sessionStorage.setItem('currentCustomer', JSON.stringify(response.customer));
            console.log('Login successful');
          } else {
            console.error('Token not received');
          }
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          throw error;
        })
      );
  }


  // Handle Authentication Response
  private handleAuthResponse(response: CustomerAuthResponse): void {
    if (response.token && response.customer) {
      sessionStorage.setItem(this.tokenKey, response.token); // Store token in sessionStorage
      sessionStorage.setItem(this.customerKey, JSON.stringify(response.customer)); // Store customer data in sessionStorage

      this.currentCustomerSubject.next(response.customer); // Update BehaviorSubject with customer data
    }
  }

  // Request Password Reset
  requestPasswordReset(emailOrPhone: string): Observable<CustomerPasswordResetResponse> {
    return this.http.post<CustomerPasswordResetResponse>(`${this.apiUrl}/request-reset`, { emailOrPhone })
      .pipe(catchError(this.handleError));
  }

  // Verify Reset Code
  verifyResetCode(emailOrPhone: string, code: string): Observable<CustomerPasswordResetResponse> {
    return this.http.post<CustomerPasswordResetResponse>(`${this.apiUrl}/verify-reset-code`, {
      emailOrPhone,
      code
    }).pipe(catchError(this.handleError));
  }

  // Reset Password
  resetPassword(emailOrPhone: string, code: string, newPassword: string): Observable<CustomerPasswordResetResponse> {
    return this.http.post<CustomerPasswordResetResponse>(`${this.apiUrl}/reset-password`, {
      emailOrPhone,
      code,
      newPassword
    }).pipe(catchError(this.handleError));
  }

  // Update Customer Profile
  updateProfile(updates: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/profile`, updates, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(updatedCustomer => {
        const currentCustomer = this.currentCustomerSubject.value;
        if (currentCustomer) {
          const mergedCustomer = { ...currentCustomer, ...updatedCustomer };
          sessionStorage.setItem(this.customerKey, JSON.stringify(mergedCustomer)); // Update in sessionStorage
          this.currentCustomerSubject.next(mergedCustomer); // Update BehaviorSubject
        }
      }),
      catchError(this.handleError)
    );
  }

  // Get customer data by ID
  getCustomerById(): Observable<Customer> {
    const customerData = sessionStorage.getItem(this.customerKey);
    
    if (!customerData) {
      return throwError(() => new Error('User is not authenticated'));
    }
    
    // Parse the JSON string to get the customer object
    const customer = JSON.parse(customerData);
    const customerId = customer.customerId; // Extract just the ID
    
    // Get token for authentication
    const token = sessionStorage.getItem(this.tokenKey);
    if (!token) {
      return throwError(() => new Error('Token is missing'));
    }
    
    // Set Authorization header with Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Customer>(`${this.apiUrl}/profile/${customerId}`, { headers })
      .pipe(
        tap(response => {
          console.log('Customer data retrieved:', response);
          this.currentCustomerSubject.next(response);
        }),
        catchError(this.handleError)
      );
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem(this.tokenKey); // Remove token from sessionStorage
    sessionStorage.removeItem(this.customerKey); // Remove customer data from sessionStorage
    this.currentCustomerSubject.next(null); // Clear BehaviorSubject
  }

  // Get current customer
  getCurrentCustomer(): Customer | null {
    const customerData = sessionStorage.getItem('currentCustomer');
    return customerData ? JSON.parse(customerData) : null;
  }

  // Get current customer as observable
  getCurrentCustomer$(): Observable<Customer | null> {
    return this.currentCustomerSubject.asObservable(); // Return as observable
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(this.tokenKey); // Check if token exists in sessionStorage
    const currentCustomer = sessionStorage.getItem(this.customerKey); // Check if current customer exists in sessionStorage
  
    if (!token || !currentCustomer) {
      console.log('User is not authenticated. Token or customer data missing.');
      return false;  // If either is missing, the user is not authenticated
    }
  
    try {
      const decodedToken: any = jwtDecode(token); // Decode the JWT token to get its payload
      const currentTime = Date.now() / 1000;  // Get current time in seconds
  
      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        console.log('Token expired.');
        this.logout(); // Logout if the token is expired
        return false;  // Token expired
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();  // Logout if there's an error decoding the token
      return false;  // Invalid token
    }
  
    console.log('User is authenticated.');
    return true;  // If token and customer data are valid, user is authenticated
  }
  


  // Error handling with specific error types
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Invalid request';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          this.logout(); // Clear invalid session
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 409:
          errorMessage = 'Email already exists';
          break;
        case 422:
          errorMessage = 'Validation error';
          break;
        case 500:
          errorMessage = 'Server error';
          break;
        default:
          errorMessage = error.error.message || `Error Code: ${error.status}`;
      }
    }

    console.error('CustomerService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
