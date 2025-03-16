import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, AppRoutingModule, RouterModule, ReactiveFormsModule,FormsModule,LogInComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}