import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,  
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isSubscribed: boolean = false;

  subscribe(event: Event): void {
    event.preventDefault(); // Ngăn trang reload
    console.log("Subscribed!"); // Kiểm tra xem hàm có chạy không
    this.isSubscribed = true; // Cập nhật trạng thái
  }

  socialLinks = [
    { icon: 'facebook', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'tiktok', url: '#' }
  ];

  supportLinks = [
    { name: 'Delivery policy', url: '#' },
    { name: 'Warranty policy', url: '#' },
    { name: 'Privacy policy', url: '#' },
    { name: 'Contact', url: '#' }
  ];
  
}