import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart-service.service';
import { CartItem } from '../models/cart-item.model';  // Import CartItem
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CartPageComponent implements OnInit {
  couponCode: string = '';
  isCartUpdated = false;
  isCheckout = false;
  cartItems: CartItem[] = [];  // Array of CartItem, which includes both product and quantity

  quantities: { [key: string]: number } = {};  // Map to store quantity for each product

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
      // Initialize quantities
      items.forEach(item => {
        this.quantities[item.product.Product_ID] = item.quantity;
      });
    });
  }

  applyCoupon(): void {
    console.log('Coupon applied: ', this.couponCode);
  }

  updateCart(): void {
    this.cartItems.forEach(item => {
      this.cartService.addToCart(item.product, this.quantities[item.product.Product_ID]);
    });
  }

  proceedToCheckout(): void {
    console.log('Proceeding to checkout...');

    // Navigate to the payment page and pass the cart data as state
    this.router.navigate(['/payment'], {
      state: { cartItems: this.cartItems }  // Pass cartItems to the payment page
    });
  }


  convertPrice(price: string | null | undefined): string {
    if (!price) return '0 VND';
    // Ensure we're working with a numeric value
    const numericPrice = typeof price === 'string' ? 
      Number(price.replace(/\D/g, '')) : 
      Number(price);
    
    // Format the price using Vietnamese locale
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(numericPrice);
    return formattedPrice + ' VND';
  }

  calculateSubtotal(item: CartItem): string {
    // Handle potential string or numeric price
    const numericPrice = typeof item.product.Product_Price === 'string' ? 
      Number(item.product.Product_Price.replace(/\D/g, '')) : 
      Number(item.product.Product_Price);
      
    const quantity = this.quantities[item.product.Product_ID] || 0;
    return this.convertPrice((numericPrice * quantity).toString());
  }

  // Function to update the cart with a given product and quantity
  addToCart(item: CartItem): void {
    this.cartService.addToCart(item.product, this.quantities[item.product.Product_ID]);
  }

  updateQuantity(item: CartItem, change: number): void {
    const currentQuantity = this.quantities[item.product.Product_ID] || 0;
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      this.quantities[item.product.Product_ID] = newQuantity;
      this.cartService.updateQuantity(item.product, newQuantity);
    }
  }

  // Remove item 
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.product); // Call the CartService to remove the item
  }
}