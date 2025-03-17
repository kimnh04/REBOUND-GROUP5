import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationEnvironment } from '../../environments/reservationEnvironment';
import { ReservationInterface } from '../models/reservation.model'; // Import model

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl: string = ReservationEnvironment.apiUrl;

  constructor(private http: HttpClient) {}

  // Lấy tất cả các đặt chỗ
  getReservations(): Observable<ReservationInterface[]> {
    return this.http.get<ReservationInterface[]>(`${this.apiUrl}/reservation`);
  }
  

  // Thêm một đặt chỗ mới
  addReservation(reservation: ReservationInterface): Observable<ReservationInterface> {
    return this.http.post<ReservationInterface>(`${this.apiUrl}/reservation`, reservation);
  }

  // Cập nhật một đặt chỗ
  updateReservation(reservation: ReservationInterface): Observable<ReservationInterface> {
    return this.http.put<ReservationInterface>(`${this.apiUrl}/reservation/${reservation.Reservation_ID}`, reservation);
  }

  // Xóa một đặt chỗ
  deleteReservation(reservationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservation/${reservationId}`);
  }
}
