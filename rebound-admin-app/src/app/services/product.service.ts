import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from '../models/product.model';  // Import Product model
import { ProductEnvironment } from '../../environments/productEnvironment'; 


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  // Hàm lấy danh sách sản phẩm từ API
  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(ProductEnvironment.apiUrl);  // Sử dụng URL từ ProductEnvironment
  }

  // Hàm xóa sản phẩm theo Product_ID
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${ProductEnvironment.apiUrl}/${productId}`);  // Xóa sản phẩm bằng API URL từ ProductEnvironment
  }
}