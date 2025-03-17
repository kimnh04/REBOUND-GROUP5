import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductComponent {
  product = { name: '', category: '', status: '', price: '', stock: '' };

  constructor(private location: Location, private productService: ProductService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.productService.addProduct(this.product); // Lưu sản phẩm mới
    alert('Product Saved!');
    this.goBack(); // Quay lại trang quản lý sản phẩm
  }

  formatPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      let value = input.value.replace(/\D/g, "");
      input.value = new Intl.NumberFormat('vi-VN').format(Number(value));
      this.product.price = input.value; // Cập nhật giá vào object
    }
  }
  goBack() {
    this.location.back();
  }
}