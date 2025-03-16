import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-page',
  standalone: true,
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent {
  private currentPosition = 0;
  private readonly itemWidth = 320; // 300px + 20px gap
  private visibleItems = 3; // Number of visible items

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    // Clone first few items and append to end for smooth circular effect
    this.setupCircularGallery();
  }

  private setupCircularGallery() {
    const container = document.querySelector('.piercing-types-container');
    const items = container?.querySelectorAll('.piercing-type');
    
    if (container && items) {
      // Clone first few items
      for (let i = 0; i < this.visibleItems; i++) {
        const clone = items[i].cloneNode(true) as HTMLElement;
        container.appendChild(clone);
      }
    }
  }

  moveGallery(direction: number) {
    const container = document.querySelector('.piercing-types-container') as HTMLElement;
    const items = container.querySelectorAll('.piercing-type');
    const totalItems = items.length - this.visibleItems; // Subtract cloned items

    if (direction > 0) {
      // Moving right
      this.currentPosition++;
      if (this.currentPosition >= totalItems) {
        // Reset position smoothly
        setTimeout(() => {
          container.style.transition = 'none';
          this.currentPosition = 0;
          container.style.transform = `translateX(0)`;
          setTimeout(() => {
            container.style.transition = 'transform 0.5s ease';
          }, 50);
        }, 500);
      }
    } else {
      // Moving left
      if (this.currentPosition <= 0) {
        container.style.transition = 'none';
        this.currentPosition = totalItems - 1;
        container.style.transform = `translateX(-${this.currentPosition * this.itemWidth}px)`;
        setTimeout(() => {
          container.style.transition = 'transform 0.5s ease';
          this.currentPosition--;
        }, 50);
      } else {
        this.currentPosition--;
      }
    }

    container.style.transform = `translateX(-${this.currentPosition * this.itemWidth}px)`;
  }

  onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === 'transform') {
      const container = event.target as HTMLElement;
      container.style.transition = 'transform 0.5s ease';
    }
  }
  navigateToBooking() {
    console.log('Navigating to Booking!');
    this.router.navigate(['/booking']);  // Navigate to /booking programmatically
  }

}
