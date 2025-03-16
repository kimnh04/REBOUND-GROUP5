import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {
  constructor(private router: Router) {}

  // Khi nhấn Yes, điều hướng đến Login
  onYesClick() {
    this.router.navigate(['/log-in']);
  }

  // Khi nhấn No, điều hướng đến Dashboard
  onNoClick() {
    this.router.navigate(['/dashboard']);
  }
}