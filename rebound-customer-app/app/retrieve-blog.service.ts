import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Blog } from './models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8000/api/blog'; // Backend API URL

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error('Blog data structure is invalid');
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Blog not found'));
        }
        if (error.error?.message) {
          return throwError(() => new Error(error.error.message));
        }
        return throwError(() => new Error('An error occurred while fetching the blog'));
      })
    );
  }

  getBlogsByCategory(category: string): Observable<Blog[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Blog[]>(`${this.apiUrl}`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = 'Blog not found';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
        default:
          errorMessage = `Server Error: ${error.status}. ${error.error?.message || 'Unknown error'}`;
      }
    }

    console.error('🚨 Blog Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}