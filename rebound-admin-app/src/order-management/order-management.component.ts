import { Component, computed, effect, Inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderInterface } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orders: OrderInterface[] = [];  // Dữ liệu đơn hàng sẽ lấy từ API

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Gọi API để lấy dữ liệu đơn hàng
    this.orderService.getOrders().subscribe(
      (data: OrderInterface[]) => {
        this.orders = data;  // Gán dữ liệu đơn hàng vào mảng orders
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        // Sau khi xóa thành công, lọc lại danh sách đơn hàng
        this.orders = this.orders.filter(order => order.Order_ID !== orderId);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  deleteSelectedOrders(): void {
    // Xóa các đơn hàng đã được chọn
    const selectedOrderIds = this.orders.filter(order => order.selected).map(order => order.Order_ID);
    
    selectedOrderIds.forEach(Order_ID => {
      this.orderService.deleteOrder(Order_ID).subscribe(
        () => {
          // Sau khi xóa thành công, lọc lại danh sách đơn hàng đã chọn
          this.orders = this.orders.filter(order => !selectedOrderIds.includes(order.Order_ID));
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting selected orders:', error);
        }
      );
    });}

  formatPrice(price: any): string {
    // Chuyển giá trị về kiểu chuỗi nếu chưa phải chuỗi
    const priceStr = String(price);
  
    // Kiểm tra nếu giá không phải là một số hợp lệ
    if (isNaN(Number(priceStr)) || !priceStr) {
      return 'Invalid Price'; // Trả về giá trị mặc định nếu không hợp lệ
    }
  
    // Nếu giá hợp lệ, định dạng và trả về (loại bỏ dấu '.')
    return priceStr.replace('.', '') + ' ₫';
  }

  // Cập nhật tìm kiếm
  updateSearchQuery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchQuery = inputElement.value.trim().toLowerCase();
    this.orders = this.orders.filter(order =>
      order.Order_ID.toLowerCase().includes(searchQuery)
    );
  }

  // Chọn hoặc bỏ chọn tất cả các đơn hàng
  selectAllOrders(event: any) {
    const isChecked = event.target.checked;
    this.orders = this.orders.map(order => ({ ...order, selected: isChecked }));
  }

  // Chọn hoặc bỏ chọn một đơn hàng riêng biệt
  toggleOrderSelection(orderId: string) {
    this.orders = this.orders.map(order =>
      order.Order_ID === orderId ? { ...order, selected: !order.selected } : order
    );
  }
}