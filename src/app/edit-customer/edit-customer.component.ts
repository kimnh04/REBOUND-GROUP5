import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
    encapsulation: ViewEncapsulation.None,
  
})
export class EditCustomerComponent {
  customer = {
    email: 'thuynnd22411c@st.uel.edu.vn',
    phoneNumber: '0123456789',
    address: 'No. 11, Street No. 6, Quarter 13, Linh Xuan Ward, Thu Duc City, Vietnam',
    status: 'Loyal customer',
    dob: '2004-01-01',
    description: '',
  };

  totalOrder: number = 12;
  totalPurchase: string = '';

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.calculateTotalPurchase();
  }

  calculateTotalPurchase() {
    const pricePerOrder = 462500;
    this.totalPurchase = (this.totalOrder * pricePerOrder).toLocaleString() + ' VND';
  }

  goBack(): void {
    this.location.back();
  }

  // Clear form fields
  clear(): void {
    this.customer = {
      email: '',
      phoneNumber: '',
      address: '',
      status: 'Member',
      dob: '',
      description: '',
    };
  }
  save(): void {
    console.log('Customer information saved:', this.customer);
    // Add save logic here (e.g., API call)
  }
}

