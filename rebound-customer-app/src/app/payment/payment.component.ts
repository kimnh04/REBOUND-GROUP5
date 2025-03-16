import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router to access route state
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../models/cart-item.model'; // Import CartItem interface
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PaymentComponent implements OnInit {
  orderItems: CartItem[] = [];  // Store order items from the cart as CartItem type
  subtotal: number = 0;         // Calculate subtotal
  shipping: number = 50000;        // Shipping cost
  total: number = 0;            // Total price including shipping
  paymentForm!: FormGroup;      // Form group for payment details
  showOrderAnnouncement: boolean = false;

  countries = ['USA', 'Canada', 'Vietnam'];  // Example countries
  states = ['California', 'Texas', 'Hanoi', 'Ho Chi Minh', 'Da Nang'];  // Example states
  districts = ['District 1', 'District 2', 'District 7', 'Hai Chau'];   // Example districts

  paymentMethods = [
    { label: 'Credit Card', value: 'credit-card' },
    { label: 'QR code', value: 'QR code' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Cash on Delivery', value: 'Cash on Delivery' }

  ];

  constructor(
    private router: Router, // Inject Router to access state data
    private fb: FormBuilder // Inject FormBuilder to create the form
  ) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.orderItems = navigation.extras.state['cartItems'];
      console.log('Received order items:', this.orderItems);
    }
  }

  ngOnInit(): void {
    // Get the cart data from the router state
    const state = history.state;
    if (state && state.cartItems) {
      this.orderItems = state.cartItems;
      console.log('Cart items loaded:', this.orderItems);
    } else {
      console.warn('No cart items found in state');
      // Optionally redirect back to cart if no items
      // this.router.navigate(['/cart']);
    }

    // Initialize form with any saved user data
    const savedUserData = localStorage.getItem('userData');
    const userDefaults = savedUserData ? JSON.parse(savedUserData) : {};

    this.paymentForm = this.fb.group({
      fullName: [userDefaults.fullName || '', [Validators.required, Validators.minLength(3)]],
      phone: [userDefaults.phone || '', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      email: [userDefaults.email || '', [Validators.required, Validators.email]],
      country: ['Vietnam', Validators.required], // Default to Vietnam
      state: [userDefaults.state || '', Validators.required],
      district: [userDefaults.district || '', Validators.required],
      address: [userDefaults.address || '', [Validators.required, Validators.minLength(5)]],
      commune: [userDefaults.commune || '', Validators.required],
      paymentMethod: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue]
    });

    // Calculate totals after ensuring we have order items
    if (this.orderItems.length > 0) {
      this.calculateSubtotal();
      this.calculateTotal();
    }

    // Subscribe to form changes to save user data
    this.paymentForm.valueChanges.subscribe(formData => {
      const userData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        state: formData.state,
        district: formData.district,
        address: formData.address,
        commune: formData.commune
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    });
}

  // Calculate the subtotal of all the products in the cart
  calculateSubtotal(): void {
    this.subtotal = this.orderItems.reduce((total, item) => {
      const price = this.parsePrice(item.product.Product_Price);
      return total + (price * item.quantity);
    }, 0);
  }

  // Calculate the total (subtotal + shipping cost)
  calculateTotal(): void {
    this.total = this.subtotal + this.shipping;
  }
  
  // Parse the price by removing non-numeric characters and returning it as a float
  parsePrice(price: string): number {
    const numericPrice = parseFloat(price.replace(/\D/g, ''));  // Remove non-numeric characters
    return isNaN(numericPrice) ? 0 : numericPrice; // Return 0 if the parsed value is NaN
  }

  // Format price as currency (VND)
  formatCurrency(price: string | number | null | undefined): string {
    if (!price) return '0 VND';

    // Convert to number and remove non-numeric characters if string
    const numericPrice = typeof price === 'string' ?
      Number(price.replace(/\D/g, '')) :
      Number(price);

    // Format using Vietnamese locale
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(numericPrice);
  }


  // Check if form control is invalid
  isInvalid(controlName: string): boolean {
    const control = this.paymentForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  // Place the order when the form is submitted
  placeOrder(): void {
    if (this.paymentForm.valid) {
      console.log('Order placed with the following details:', this.paymentForm.value);
      
      // Show the announcement
      this.showOrderAnnouncement = true;
      
      // Hide the announcement after 3 seconds
      setTimeout(() => {
        this.showOrderAnnouncement = false;
        
        // Optionally: Navigate to a confirmation page or clear the cart
        // this.router.navigate(['/order-confirmation']);
      }, 3000);
      
      // Further processing logic goes here (e.g., sending data to a server)
    }
  }
}
