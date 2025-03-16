import { Component, Inject, LOCALE_ID, signal, effect, computed } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  category: string;
  imageUrl: string;
  selected: boolean; 
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products = signal<Product[]>([
    { id: 'P001', name: 'Sample Product', price: 100000, stock: 20, status: 'Active', category: 'Electronics', imageUrl: 'images/sample.jpg', selected: false },
    { id: 'P002', name: 'Gaming Mouse', price: 500000, stock: 15, status: 'Active', category: 'Accessories', imageUrl: 'images/mouse.jpg', selected: false },
    { id: 'P003', name: 'Mechanical Keyboard', price: 1200000, stock: 10, status: 'Inactive', category: 'Accessories', imageUrl: 'images/keyboard.jpg', selected: false }
  ]);

  // Biến tìm kiếm sản phẩm
  searchQuery = signal('');
  filteredProducts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    return this.products().filter(product =>
      query === '' || 
      product.id.toLowerCase().includes(query) ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query)
    );
  });

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router // Inject Router
  ) {
    effect(() => console.log('Search Query:', this.searchQuery()));
  }

  // Cập nhật tìm kiếm từ input
  updateSearchQuery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value.trim());
  }

  // Đổi trạng thái sản phẩm
  toggleStatus(product: Product) {
    product.status = product.status === 'Active' ? 'Inactive' : 'Active';
  }

  // Xóa sản phẩm
  deleteProduct(productId: string) {
    this.products.set(this.products().filter(product => product.id !== productId));
  }

  // Sửa sản phẩm
  editProduct(product: Product) {
    console.log('Editing product:', product);
  }

  // Format giá tiền
  formatPrice(price: number): string {
    return formatCurrency(price, this.locale, '', 'VND').replace('VND', '') + ' ₫';
  }

  // Chọn hoặc bỏ chọn tất cả sản phẩm
  selectAllProducts(event: any) {
    const isChecked = event.target.checked;
    this.products.set(this.products().map(product => ({ ...product, selected: isChecked })));
  }

  // Chọn sản phẩm riêng biệt
  toggleProductSelection(product: Product) {
    product.selected = !product.selected;
  }

  // Xóa các sản phẩm đã chọn
  deleteSelectedProducts() {
    this.products.set(this.products().filter(product => !product.selected));
  }

}
