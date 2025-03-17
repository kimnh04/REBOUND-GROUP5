import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  private validEmail = 'reboundpiercing.official@gmail.com'; // Email cố định
  private defaultPassword = '123456789'; // Mật khẩu mặc định

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberPassword: [false],
    });
  }

  // Khi người dùng đăng nhập
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Lấy mật khẩu đã lưu trong localStorage
      const storedPassword = localStorage.getItem('userPassword') || this.defaultPassword;

      // Kiểm tra email và mật khẩu nhập vào với dữ liệu từ localStorage hoặc mật khẩu mặc định
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

  // Khi người dùng quên mật khẩu và reset mật khẩu mới
  resetPassword(newPassword: string): void {
    if (newPassword) {
      // Lưu mật khẩu mới vào localStorage
      localStorage.setItem('userPassword', newPassword);
      this.successMessage = 'Password updated successfully!';
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Please enter a new password.';
      this.successMessage = null;
    }
  }
}
