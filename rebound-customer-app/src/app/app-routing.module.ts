import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderDetailsComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/about-us', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent }, 
  { path: 'products', component: ProductPageComponent },
  { path: 'product-category/:category', component: ProductPageComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'services', component: ServicePageComponent},
  { path: 'blog', component: BlogPageComponent},
  { path: 'faqs', component: FaqPageComponent},
  { path: 'contact', component: ContactPageComponent},
  { path: 'login', component: LogInComponent},
  { path: 'cart', component: CartPageComponent},
  { path: 'payment', component:PaymentComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'order-detail', component: OrderDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
