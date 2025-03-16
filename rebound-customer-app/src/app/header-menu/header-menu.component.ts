import { Component, ElementRef, AfterViewInit, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RetrieveProductService } from '../retrieve-products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HeaderMenuComponent implements AfterViewInit {
  @Output() categorySelected = new EventEmitter<string>();
  @Output() openModalEvent = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  isSearchActive = false;
  searchQuery = '';
  searchResults: Product[] = [];
  isLoggedIn = false;  // Track whether user is logged in

  constructor(
    private el: ElementRef,
    private router: Router,
    private productService: RetrieveProductService
  ) {
    // Initialize login status from localStorage
    this.isLoggedIn = this.isAuthenticated();
  }

  ngAfterViewInit() {
    // Handle dropdown behavior
    const dropdowns: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle: HTMLElement | null = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', (event: Event) => {
          event.stopPropagation();
          dropdown.classList.toggle('active');
          dropdowns.forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('active');
            }
          });
        });
      }
    });
  }

  openModal() {
    this.openModalEvent.emit(); // Emit an event to open the modal
  }

  onLoginClick() {
    // Check if the user is logged in
    if (this.isLoggedIn) {
      console.log('Navigating to profile:', this.isLoggedIn);
      this.router.navigate(['/profile']);  // Navigate to profile page
    } else {
      // If the user is not logged in, show the login modal
      this.openModalEvent.emit();
      console.log('User is not logged in');
    }
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth_token');  // Check if the token exists in sessionStorage
  }

  logout() {
    // Clear authentication-related data from sessionStorage
    sessionStorage.removeItem('token');  // Remove token from sessionStorage
    sessionStorage.removeItem('currentCustomer');  // Optionally, remove customer data
    
    // Redirect to the login page after logging out
    this.router.navigate(['/login']);
  }
  

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      });
    }
  }

  handleSearch() {
    const query = this.searchQuery?.trim();
    if (!query) return;
  
    console.log('Searching for:', query);
    this.router.navigate(['/products'], {
      queryParams: { search: query }
    }).then(() => {
      console.log('Navigation completed');
      this.clearSearch();
    }).catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.isSearchActive = false;
  }

  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }

  selectCategory(category: string): void {
    console.log('Category selected:', category);
    this.categorySelected.emit(category);
    
    const formattedCategory = category.trim();
    const dropdowns: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown: HTMLElement) => {
      dropdown.classList.remove('active');
    });

    console.log('Navigating to category:', formattedCategory);
    this.router.navigate(['/product-category', formattedCategory])
      .then(() => {
        console.log('Navigation completed successfully');
      })
      .catch(error => {
        console.error('Navigation failed:', error);
      });
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns() {
    const dropdowns: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const searchContainer = this.el.nativeElement.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target)) {
      this.isSearchActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdownsOnClickOutside(event: MouseEvent) {
    const searchContainer = this.el.nativeElement.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target)) {
      this.isSearchActive = false;
    }
  }
}
