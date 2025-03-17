import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInterface } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { RouterModule, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.map(customer => ({
          ...customer,
          selected: false, 
        }));
        console.log('Customers loaded successfully:', this.customers);
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError('Failed to fetch customers', err)
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
    this.router.navigate(['/edit-customer', customer.Customer_ID]);
  }

  deleteCustomer(id: string): void {
    this.removeCustomers([id]);
  }

  deleteSelectedCustomers(): void {
    const selectedIds = this.customers.filter(c => c.selected).map(c => c.Customer_ID);
    if (!selectedIds.length) {
      console.warn('No customers selected for deletion.');
      return;
    }
    this.removeCustomers(selectedIds);
  }

  private removeCustomers(ids: string[]): void {
    this.customers = this.customers.filter(customer => !ids.includes(customer.Customer_ID));
    this.cdr.detectChanges();

    forkJoin(ids.map(id => this.customerService.deleteCustomer(id))).subscribe({
      next: () => console.log(`Deleted ${ids.length} customers.`),
      error: (err) => this.handleError('Error deleting customers', err)
    });
  }

  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error);
  }
}