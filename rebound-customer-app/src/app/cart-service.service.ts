import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';
import { CartItem } from './models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  currentCartItems = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: Product, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => 
      item.product.Product_ID === product.Product_ID
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(product: Product): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => 
      item.product.Product_ID !== product.Product_ID
    );
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(product: Product, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => 
      item.product.Product_ID === product.Product_ID
    );
    
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      const price = Number(item.product.Product_Price.replace(/\D/g, ''));
      return total + (price * item.quantity);
    }, 0);
  }
}