import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() returnToLoginEvent = new EventEmitter<void>();

  // Public property for easier debugging
  showAnnouncement = false;
  
  private announcementTimer: any = null;
  
  userData = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    sex: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  };
  
  constructor() {
    console.log('Constructor initialized');
  }
  
  ngOnInit() {
    console.log('SignUp component initialized');
  }
  
  ngOnDestroy() {
    if (this.announcementTimer) {
      clearTimeout(this.announcementTimer);
    }
  }
  
  onSubmit() {
    console.log('Form submitted, validating...');
    // Skip validation for testing purposes
    this.showAnnouncementMessage();
    return false; // Prevent form submission
  }
  
  validateForm(): boolean {
    // Simple validation for testing
    return true;
  }
  
  backToLogin(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.returnToLoginEvent.emit();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  showAnnouncementMessage() {
    console.log('showAnnouncementMessage called');
    
    // Force it to show
    this.showAnnouncement = true;
    console.log('Announcement visibility:', this.showAnnouncement);
    
    // Keep it visible for testing
    this.announcementTimer = setTimeout(() => {
      this.showAnnouncement = false;
      console.log('Announcement hidden after timeout');
    }, 5000);
  }
}