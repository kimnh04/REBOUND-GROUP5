import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class RetrieveProductService {
  private apiUrl = 'http://localhost:8000/api/product'; // MongoDB API endpoint

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log('Fetching products from API...');
    
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => console.log('Products retrieved:', products.length)),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(product => console.log('Product retrieved:', product)),
      catchError(error => {
        console.error(`Error fetching product ${id}:`, error);
        throw error; // Rethrow to let components handle the error
      })
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return this.getProducts();
    }

    const params = new HttpParams().set('search', query.toLowerCase());
    
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params }).pipe(
      map(products => products.filter(product => 
        product.Product_Name.toLowerCase().includes(query.toLowerCase()) ||
        product.Product_Description.toLowerCase().includes(query.toLowerCase())
      )),
      tap(products => console.log('Search results:', products.length, 'products found')),
      catchError(error => {
        console.error('Error searching products:', error);
        return of([]);
      })
    );
  }
}