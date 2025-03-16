import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInterface } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customers: CustomerInterface[] = [];
  searchQuery: string = '';

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        // ⚠ Chuyển đổi tên thuộc tính để phù hợp với model
        this.customers = data.map(customer => ({
          Customer_ID: customer.Customer_ID,
          Customer_Name: customer.Customer_Name,
          Customer_Email: customer.Customer_Email,
          Customer_Phone: customer.Customer_Phone,
          selected: false, // Mặc định không chọn
        }));

        console.log('Customers loaded successfully:', this.customers);
        this.cdr.detectChanges(); // Cập nhật giao diện ngay sau khi có dữ liệu
      },
      error: (err) => {
        console.error('Failed to fetch customers:', err);
      }
    });
  }

  updateSearchQuery(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  searchCustomers(): void {
    console.log('Search query:', this.searchQuery);
  }

  selectAllCustomers(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.customers.forEach(customer => (customer.selected = checked));
  }

  toggleCustomerSelection(customer: CustomerInterface): void {
    customer.selected = !customer.selected;
  }

  editCustomer(customer: CustomerInterface): void {
    console.log('Edit customer:', customer);
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(customer => customer.Customer_ID !== id);
        console.log(`Customer ${id} deleted successfully`);
      },
      error: (err) => {
        console.error(`Error deleting customer ${id}:`, err);
      }
    });
  }

  deleteSelectedCustomers(): void {
    const selectedIds = this.customers.filter(c => c.selected).map(c => c.Customer_ID);
    if (!selectedIds.length) {
      console.warn('No customers selected for deletion.');
      return;
    }

    selectedIds.forEach(id => {
      this.deleteCustomer(id);
    });

    console.log(`Deleted ${selectedIds.length} customers.`);
  }
}