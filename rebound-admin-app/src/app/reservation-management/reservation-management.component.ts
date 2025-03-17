import { Component, Inject, LOCALE_ID, signal } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from '../services/reservation.service'; // Import service
import { ReservationInterface } from '../models/reservation.model'; // Import model
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent {
  reservations = signal<ReservationInterface[]>([]); // Initialize with empty array
  searchQuery = signal(''); // Initialize the search query

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private reservationService: ReservationService // Inject service
  ) {
    // Fetch data from API when component is initialized
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe(
      (data: ReservationInterface[]) => {
        this.reservations.set(data); // Update the reservation list with fetched data
      },
      (error: any) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  formatDate(date: string | Date): string {
    if (!date) return 'N/A';
    return formatDate(new Date(date), 'medium', this.locale);
  }

  updateSearchQuery(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value);
  }

  toggleStatus(reservation: ReservationInterface) {
    reservation.Status = reservation.Status === 'Confirmed' ? 'Cancelled' : 'Confirmed';
    // Update the reservation status on the backend if necessary
    this.reservationService.updateReservation(reservation).subscribe();
  }

  editReservation(reservation: ReservationInterface) {
    console.log('Editing reservation:', reservation);
  }

  selectAllReservations(event: any) {
    const isChecked = event.target.checked;
    this.reservations.set(this.reservations().map(reservation => ({ ...reservation, selected: isChecked })));
  }

  toggleReservationSelection(reservation: ReservationInterface) {
    reservation.selected = !reservation.selected;
  }

  deleteReservation(reservationId: string): void {
    this.reservationService.deleteReservation(reservationId).subscribe(
      () => {
        // After successful deletion, filter out the deleted reservation
        this.reservations.set(this.reservations().filter(reservation => reservation.Reservation_ID !== reservationId));
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting reservation:', error);  // Handle error when deleting reservation
      }
    );
  }

  deleteSelectedReservations(): void {
    // Delete the selected reservations
    const selectedReservationIds = this.reservations().filter(reservation => reservation.selected).map(reservation => reservation.Reservation_ID);

    selectedReservationIds.forEach(Reservation_ID => {
      this.reservationService.deleteReservation(Reservation_ID).subscribe(
        () => {
          // After successful deletion, filter out the selected reservations
          this.reservations.set(this.reservations().filter(reservation => !selectedReservationIds.includes(reservation.Reservation_ID)));
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting selected reservations:', error);
        }
      );
    });
  }
}
