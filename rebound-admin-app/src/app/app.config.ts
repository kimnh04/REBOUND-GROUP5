import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: AddProductComponent },
  { path: '', component: AddOrderComponent },
  { path: '', component: AddReservationComponent },
  { path: '', component: OrderDetailComponent },
  { path: '', component: ReservationDetailComponent },
  { path: '', component: EditCustomerComponent },
  { path: '', component: EditProductComponent },
  
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};