import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  private validEmail = 'reboundpiecring.official@gmail.com'; // Email cố định

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberPassword: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Lấy mật khẩu đã lưu trong localStorage
      const storedPassword = localStorage.getItem('userPassword');

      // Kiểm tra email và mật khẩu nhập vào với dữ liệu từ localStorage
      if (email === this.validEmail && password === storedPassword) {
        this.successMessage = 'Login successful!';
        this.errorMessage = null;
        
        // Điều hướng đến dashboard sau 1 giây
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1500);
      } else {
        this.errorMessage = 'Please check your email or password again';
        this.successMessage = null;
      }
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = null;
    }
  }
}