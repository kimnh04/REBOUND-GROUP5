import { Component, Inject, LOCALE_ID, signal, effect, computed } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Reservation {
  id: string;
  customerName: string;
  serviceType: string;
  status: string;
  reservationDate: string;
  selected: boolean; // Checkbox state
}

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent {
  reservations = signal<Reservation[]>([
    { id: 'R001', customerName: 'John Doe', serviceType: 'Consulting', status: 'Confirmed', reservationDate: '2025-03-10', selected: false },
    { id: 'R002', customerName: 'Jane Smith', serviceType: 'Coaching', status: 'Pending', reservationDate: '2025-03-15', selected: false },
    { id: 'R003', customerName: 'Alice Brown', serviceType: 'Advisory', status: 'Confirmed', reservationDate: '2025-04-01', selected: false }
  ]);

  // Biến tìm kiếm
  searchQuery = signal('');

  // Tự động cập nhật danh sách đặt chỗ theo từ khóa tìm kiếm
  filteredReservations = computed(() =>
    this.reservations().filter(reservation =>
      reservation.customerName.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      reservation.serviceType.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      reservation.status.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      reservation.id.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  );

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router // Inject Router
  ) {
    effect(() => console.log('Search Query:', this.searchQuery()));
  }

  formatDate(date: string): string {
    return formatDate(date, 'mediumDate', this.locale);
  }

  updateSearchQuery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value);
  }

  toggleStatus(reservation: Reservation) {
    reservation.status = reservation.status === 'Confirmed' ? 'Cancelled' : 'Confirmed';
  }

  deleteReservation(reservationId: string) {
    this.reservations.set(this.reservations().filter(reservation => reservation.id !== reservationId));
  }

  editReservation(reservation: Reservation) {
    console.log('Editing reservation:', reservation);
  }

  selectAllReservations(event: any) {
    const isChecked = event.target.checked;
    this.reservations.set(this.reservations().map(reservation => ({ ...reservation, selected: isChecked })));
  }

  toggleReservationSelection(reservation: Reservation) {
    reservation.selected = !reservation.selected;
  }

  deleteSelectedReservations() {
    this.reservations.set(this.reservations().filter(reservation => !reservation.selected));
  }
}