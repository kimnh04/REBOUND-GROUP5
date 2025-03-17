import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None // Cho CSS global
  
})
export class SideBarComponent {
  constructor(private router: Router) {}

  navigateToDashboard() {

    this.router.navigate(['/dashboard']);
  }

  navigateToCustomer() {
    this.router.navigate(['/customer-management']);
  }

  navigateToProduct() {
    this.router.navigate(['/product-management']);
  }

  navigateToReservation() {
    this.router.navigate(['/reservation-management']);
  }

  navigateToOrder() {
    this.router.navigate(['/order-management']);
  }

  navigateToLogout() {
    this.router.navigate(['/log-out']);
  }

}