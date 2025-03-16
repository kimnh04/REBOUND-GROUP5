import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CartPageComponent } from './cart-page/cart-page.component';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailsComponent } from './order-detail/order-detail.component';
import { BookingComponent } from './booking/booking.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HeaderMenuComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentComponent,
    HeaderMenuComponent,
    ProductPageComponent,
    ProductDetailComponent, 
    ProfileComponent,
    AboutUsComponent,
    ForgetPasswordComponent,
    LogInComponent,
    BrowserAnimationsModule, 
    BlogPageComponent,
    ContactPageComponent,
    FaqPageComponent,
    FooterComponent,
    ServicePageComponent,
    SignUpComponent,
    CartPageComponent,
    OrderDetailsComponent,
    BookingComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
