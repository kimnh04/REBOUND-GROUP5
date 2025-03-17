import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomerInterface } from '../models/customer.model';
import { CustomerEnvironment } from '../../environments/customerEnvironment'; 

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerApiUrl = `${CustomerEnvironment.apiUrl}/customer`; // API endpoint for customer-related operations

  constructor(private http: HttpClient) {}

  // Fetch the list of customers
  getCustomers(): Observable<CustomerInterface[]> {
    return this.http.get<CustomerInterface[]>(this.customerApiUrl).pipe(
      catchError((error) => {
        console.error(`Error fetching customers: ${error.message}`);
        return throwError(() => new Error('Failed to fetch customers. Please try again later.'));
      })
    );
  }

  getCustomerById(id: string): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface>(`/api/customers/${id}`);
  }

  // Delete a customer by ID
  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.customerApiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting customer with ID ${id}: ${error.message}`);
        return throwError(() => new Error('Failed to delete customer. Please try again later.'));
      })
    );
  }
}
