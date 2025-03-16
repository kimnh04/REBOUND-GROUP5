import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent {
  title = 'rebound-customer-app';
  
  // Track which modal is currently open
  currentModal: 'login' | 'forgotPassword' | 'signUp' | null = null;

  openLoginModal() {
    console.log('openLoginModal triggered');
    this.currentModal = 'login';
  }

  openForgotPasswordModal() {
    console.log('openForgotPasswordModal triggered');
    this.currentModal = 'forgotPassword';
  }

  openSignUpModal() {
    console.log('openSignUpModal triggered');
    this.currentModal = 'signUp';
  }

  closeModal() {
    console.log('closeModal triggered');
    this.currentModal = null;
  }
  
  handleBackdropClick(event: MouseEvent) {
    console.log('Backdrop clicked', event.target);
    this.closeModal();
  }

   // New method to handle return to login
   returnToLogin() {
    console.log('returnToLogin triggered');
    this.currentModal = 'login';
  }
}