import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInterface } from '../models/order.model';
import { OrderEnvironment } from '../../environments/orderEnvironment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  // Hàm lấy danh sách sản phẩm từ API
  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(OrderEnvironment.apiUrl);  // Sử dụng URL từ ProductEnvironment
  }

  // Hàm xóa sản phẩm theo Product_ID
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${OrderEnvironment.apiUrl}/${orderId}`);  // Xóa sản phẩm bằng API URL từ ProductEnvironment
  }
}
