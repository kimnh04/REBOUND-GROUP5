import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component'; 
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ HeaderComponent, RouterOutlet, NgClass, SideBarComponent, NgStyle] 
})
export class AppComponent {
  title="admin-app";
  constructor(private router: Router) {}
  isLoginPage(): boolean {
    console.log(this.router.url);  // Để kiểm tra giá trị của URL
    return this.router.url === '/log-in'|| this.router.url === '/forgot-password'|| this.router.url === '/reset-password';
  }
}