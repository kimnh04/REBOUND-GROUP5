import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'reservation-detail',
  standalone: true,
  imports: [CommonModule],  // Thêm CommonModule vào imports
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation = {
    customerName: 'John Doe',
    phoneNumber: '0912345678',
    email: 'johndoe@example.com',
    dob: '1990-05-15',
    appointmentDate: '2025-03-10T14:30',
    serviceType: 'Piercing Service',
    reservationLocation: 'Rebound Cao Ba Quat - Ha Noi',
    jewelryType: 'Ear Piercing Jewelry',
    specialRequests: 'Please ensure sterilization of the jewelry.'
  };

  serviceTypes = ['Piercing Service', 'After-care Service'];
  reservationLocations = ['Rebound Cao Ba Quat - Ha Noi', 'Rebound Tam Khuong - Ha Noi', 'Rebound Ly Tu Trong - Ho Chi Minh', 'Rebound Dien Bien Phu - Ho Chi Minh'];
  jewelryTypes = ['Ear Piercing Jewelry', 'Body Piercing Jewelry', 'Other'];

  constructor() {}

  ngOnInit(): void {}
}