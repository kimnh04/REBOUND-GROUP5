import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customerAuth.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})

export class ProfileComponent implements OnInit {
  personalInfo: any[] = [];
  isEditing: boolean = false;
  isAddressEditing: boolean = false;
  fullName: string = '';
  phone: string = '';
  gender: 'Male' | 'Female' | undefined = undefined;
  dob: string | undefined = undefined;
  email: string = '';
  address: string = '';

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    // Check if the user is authenticated
    if (!this.customerService.isAuthenticated()) {
      console.error('User is not authenticated');
      this.router.navigate(['/about-us']);
      return;
    }
  
    // Get customer data from session storage instead of making an API call
    const customerData = this.customerService.getCurrentCustomer();
    if (customerData) {
      this.personalInfo = [
        { label: 'Full Name', value: customerData.fullName },
        { label: 'Gender', value: customerData.sex },
        { label: 'Phone', value: customerData.phoneNumber },
        { label: 'Date of Birth', value: customerData.dob ? new Date(customerData.dob).toLocaleDateString() : '' },
        { label: 'Email', value: customerData.email }
      ];
  
      this.fullName = customerData.fullName;
      this.phone = customerData.phoneNumber;
      this.gender = customerData.sex === 'Male' || customerData.sex === 'Female' ? customerData.sex : undefined;
      this.dob = customerData.dob ? new Date(customerData.dob).toLocaleDateString() : undefined;
      this.email = customerData.email;
      this.address = customerData.address || '';
    } else {
      console.error('No customer data found');
      this.router.navigate(['/login']);
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  toggleAddressEdit(): void {
    this.isAddressEditing = !this.isAddressEditing;
  }

  saveProfile(): void {
    const updatedCustomer: Partial<Customer> = {
      fullName: this.fullName,
      phoneNumber: this.phone,
      sex: this.gender,
      dob: this.dob ? new Date(this.dob) : null,
      email: this.email,
      address: this.address
    };

    this.customerService.updateProfile(updatedCustomer).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  } 

  logout(): void {
    this.customerService.logout(); // Call logout from customer service
    this.router.navigate(['/about-us']); // Redirect to login page after logout
  }


  cancelEdit(): void {
    this.isEditing = false;
  }
}
