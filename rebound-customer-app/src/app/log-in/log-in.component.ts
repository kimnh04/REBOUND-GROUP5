import { Component, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() forgotPasswordEvent = new EventEmitter<void>();
  @Output() signUpEvent = new EventEmitter<void>();

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],  // Adjusted for any password (e.g., phone number)
      rememberPassword: [false]
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';  // Clear previous error message

      const { email, password } = this.loginForm.value;

      // Perform login using customerService
      this.customerService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.isLoading = false;
          this.closeModal();
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = error.message || 'Login failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);  // Trigger validation errors
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  closeModal() {
    console.log('closeModal triggered in LogInComponent');
    this.closeModalEvent.emit();
  }

  openForgotPassword() {
    console.log('openForgotPassword triggered in LogInComponent');
    this.forgotPasswordEvent.emit();
  }

  openSignUp() {
    console.log('openSignUp triggered in LogInComponent');
    this.signUpEvent.emit();
  }
}
