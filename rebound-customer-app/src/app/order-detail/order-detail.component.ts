import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  imports: [CommonModule]
})
export class OrderDetailsComponent {
  order = {
    orderId: '154027',
    recipientName: 'Giang Bao Tran',
    recipientPhone: '091012004',
    recipientEmail: 'sefgiang@gmail.com',
    shippingAddress: '37 Le Loi, P.12 , TP. Da Nang',
    paymentMethod: 'Cash on delivery',
    orderDate: '10/10/2024',
    estimatedDeliveryDate: '12/10/2024',
    products: [
      { name: 'Top 14kt mixt Cz - Buddha', price: 3980000, quantity: 2, 
        get subtotal() {
          return this.price * this.quantity; // This will automatically calculate subtotal based on price and quantity
      }  },

      { name: 'Top 14kt Midsummer Moonstone - Ember', price: 3650000, quantity: 2, 
        get subtotal() {
          return this.price * this.quantity; // This will automatically calculate subtotal based on price and quantity
      }  },
      

    ],
    shippingFee: 50000,
    discount: 0,
    get total() {
      // Calculate the total dynamically based on the products' subtotals and shipping fee
      const productsTotal = this.products.reduce((sum, product) => {
        return sum + (product.price * product.quantity); // Sum of product subtotals
      }, 0);
      return productsTotal + this.shippingFee - this.discount; // Total = product total + shipping - discount
    }
  };
}
