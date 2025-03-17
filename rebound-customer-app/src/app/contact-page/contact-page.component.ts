import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  contactForm: FormGroup;
  submitted = false;
  success = false;

  companyInfo = {
    address: '24 Ly Tu Trong, Ben Nghe Ward, District 1, Ho Chi Minh city',
    email: 'reboundpiercing@gmail.com',
    hotline: '1900 609 096',
    hours: {
      weekdays: 'Monday - Friday: From 8:00AM to 8:00PM',
      weekend: 'Saturday and Sunday: From 8:00AM to 7:00PM'
    }
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      content: [''] // Content is now optional
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) return;
    
    // Here you would normally send the data to your backend API
    console.log('Form submitted:', this.contactForm.value);
    
    // Switch to success view
    this.success = true;
    this.contactForm.reset();
    this.submitted = false;
    
    // Ensure form controls are marked as pristine & untouched
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }

  reset() {
    this.success = false;
    this.submitted = false;
    this.contactForm.reset();
    
    // Ensure form controls are marked as pristine & untouched
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }

  goToMainPage() {
    this.success = false; // Reset to first screen
    this.submitted = false;
    this.contactForm.reset();
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
    this.router.navigate(['/']);
  }
}