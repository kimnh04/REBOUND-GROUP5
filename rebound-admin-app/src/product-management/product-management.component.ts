import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductInterface } from '../models/product.model'; // Import ProductInterface
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: ProductInterface[] = [];  // Dữ liệu sản phẩm sẽ được lấy từ API

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: ProductInterface[]) => {
        this.products = data;
        console.log(this.products);  // Kiểm tra dữ liệu nhận được
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching products:", error);
      }
    );
  }
  


  // Format giá sản phẩm
  formatPrice(price: string): string {
    // Loại bỏ các ký tự không phải số và ký tự 'đ' cuối chuỗi
    const numericValue = parseFloat(price.replace(/[^\d.-]/g, '').replace(',', '.'));
  
    // Nếu giá trị hợp lệ, định dạng lại giá trị và thêm dấu ₫ vào cuối
    return numericValue ? numericValue.toLocaleString() + ' ₫' : 'N/A';
  }

  // Chọn tất cả sản phẩm
  selectAllProducts(event: any): void {
    const isChecked = event.target.checked;
    this.products = this.products.map(product => ({ ...product, selected: isChecked }));
  }

  // Chọn hoặc bỏ chọn sản phẩm riêng biệt
  toggleProductSelection(product: ProductInterface): void {
    product.selected = !product.selected;
  }

  // Xóa các sản phẩm đã chọn
  deleteSelectedProducts(): void {
    this.products = this.products.filter(product => !product.selected);
  }
    // Phương thức xóa sản phẩm
    deleteProduct(productId: string): void {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Sau khi xóa thành công, lọc lại danh sách sản phẩm
          this.products = this.products.filter(product => product.Product_ID !== productId);
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting product:', error);  // Xử lý lỗi khi xóa sản phẩm
        }
      );
    }
  
}
