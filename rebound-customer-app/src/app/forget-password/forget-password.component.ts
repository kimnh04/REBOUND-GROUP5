import { Component, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() returnToLoginEvent = new EventEmitter<void>();
  
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  
  backToLogin() {
    this.returnToLoginEvent.emit();
  }
}