import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  showBookingAnnouncement: boolean = false;

  submitBooking(event: Event): void {
    // Prevent the default form submission
    event.preventDefault();
    
    // Get form elements
    const form = event.target as HTMLFormElement;
    const nameInput = form.querySelector('#name') as HTMLInputElement;
    const phoneInput = form.querySelector('#phone') as HTMLInputElement;
    const dateInput = form.querySelector('#date') as HTMLInputElement;
    const timeInput = form.querySelector('#time') as HTMLInputElement;
    
    // Basic form validation
    if (nameInput.value && phoneInput.value && dateInput.value && timeInput.value) {
      // Process the booking data (you would add your API call here)
      console.log('Booking submitted:', {
        name: nameInput.value,
        phone: phoneInput.value,
        date: dateInput.value,
        time: timeInput.value
      });
      
      // Show the announcement
      this.showBookingAnnouncement = true;
      
      // Hide the announcement after 3 seconds
      setTimeout(() => {
        this.showBookingAnnouncement = false;
        
        // Optional: Reset the form after successful submission
        form.reset();
      }, 3000);
    } else {
      // Form validation failed - you could add specific error messages here
      console.log('Please fill in all required fields');
    }
  }
}