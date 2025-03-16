import { Component, computed, effect, Inject, LOCALE_ID, signal } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Order {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  selected: boolean;
}

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  orders = signal<Order[]>([
    { id: 'O001', productName: 'Product A', quantity: 2, unitPrice: 50000, subTotal: 100000, selected: false },
    { id: 'O002', productName: 'Product B', quantity: 1, unitPrice: 75000, subTotal: 75000, selected: false }
  ]);

  orderCount = computed(() => this.orders().length);
  searchQuery = signal('');

  filteredOrders = computed(() =>
    this.orders().filter(order =>
      order.productName.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      order.id.toLowerCase().includes(this.searchQuery().toLowerCase()) // Có thể lọc theo ID
    )
  );


  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router // Inject Router
  ) {
    effect(() => console.log('Search Query:', this.searchQuery()));
  }

  updateSearchQuery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value);
  }

  selectAllOrders(event: any) {
    const isChecked = event.target.checked;
    this.orders.update(orders => orders.map(order => ({ ...order, selected: isChecked })));
  }

  toggleOrderSelection(orderId: string) {
    this.orders.update(orders =>
      orders.map(order =>
        order.id === orderId ? { ...order, selected: !order.selected } : order
      )
    );
  }

  deleteSelectedOrders() {
    this.orders.update(orders => orders.filter(order => !order.selected));
  }

  deleteOrder(orderId: string) {
    this.orders.update(orders => orders.filter(order => order.id !== orderId));
  }

  formatPrice(price: number): string {
    return formatCurrency(price, this.locale, '', 'VND').replace('VND', '') + ' ₫';
  }
  
}
