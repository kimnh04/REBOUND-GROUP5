import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from '../models/product.model';
import { RetrieveProductService } from '../retrieve-products.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class AboutUsComponent implements OnInit {
  activeDotIndex = 0;
  selectedLocation: string = 'hanoi';
  showContent = true;
  slideTimer: any;
  showHero = true;
  newCollection: Product[] = [];
  Title_URL: string = '';

  // Hero slider images
  heroSlides = [
    'assets/images/first-row-2.png',
    'assets/images/first-row-3.png',
  ];
  currentHeroImage = this.heroSlides[0];

  // Products section data
  products = [
    { image: 'assets/images/products/product-1.jpg', alt: 'Jewelry Product', category: 'Jewelry', link: '#' },
    { image: 'assets/images/products/product-2.jpg', alt: 'Piercing Product', category: 'Piercing', link: '#' },
    { image: 'assets/images/products/product-3.jpg', alt: 'Accessories Product', category: 'Accessories', link: '#' }
  ];

  locations = [
    { key: 'hanoi', name: 'Hà Nội', selected: true },
    { key: 'hochiminh', name: 'Hồ Chí Minh', selected: false }
  ];

  // Locations and branches data  
  branches = {
    hanoi: [
      {
        name: 'Rebound Cao Ba Quat',
        address: '34A Cao Ba Quat, Ba Dinh District, Ha Noi',
        hours: '09:30 AM - 09:30 PM',
        image: 'assets/images/branch-hanoi-1.png',
        class: 'branch',
        visible: true
      },
      {
        name: 'Rebound Tam Khuong',
        address: '77 Tam Khuong, Dong Da District, Ha Noi',
        hours: '09:30 AM - 09:00 PM',
        image: 'assets/images/branch-hanoi-2.png',
        class: 'branch',
        visible: true
      }
    ],
    hochiminh: [
      {
        name: 'Rebound District 1',
        address: '123 Nguyen Hue, District 1, Ho Chi Minh City',
        hours: '10:00 AM - 10:00 PM',
        image: 'assets/images/branch-hcm-1.png',
        class: 'branch',
        visible: true
      },
      {
        name: 'Rebound District 3',
        address: '456 Vo Van Tan, District 3, Ho Chi Minh City',
        hours: '09:00 AM - 09:00 PM',
        image: 'assets/images/branch-hcm-2.png',
        class: 'branch',
        visible: true
      }
    ]
  };

  constructor(private retrieveProductService: RetrieveProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeDotIndex = 0; // Show the first slide
    this.startAutoSlide();
    this.Title_URL = this.route.snapshot.paramMap.get('titleUrl')!;
    

    this.retrieveProductService.getProducts().subscribe(products => {
      this.newCollection = products.slice(0, 5).map(product => ({
        ...product,
         Product_Price: this.formatPrice(product.Product_Price)
      }));
    });
  }



  // Hero slider function 
  changeSlide(index: number) {
    clearTimeout(this.slideTimer);
    this.activeDotIndex = index; // Directly update slide index
    this.startAutoSlide();
  }

  
  startAutoSlide() {
    this.slideTimer = setTimeout(() => {
      this.activeDotIndex = (this.activeDotIndex + 1) % 3; // Loop 0 → 1 → 2 → 0
      this.startAutoSlide();
    }, 10000); // Wait 10 seconds before auto-transition
  }


  // Branch location tab function
  showBranches(locationKey: string): void {
    // Update selected location
    this.selectedLocation = locationKey;

    // Update the selected state for locations
    this.locations.forEach(location => location.selected = (location.key === locationKey));

    // Ensure only branches of the selected location are visible
    Object.entries(this.branches).forEach(([key, branchList]) => {
      if (Array.isArray(branchList)) {
        branchList.forEach(branch => branch.visible = (key === locationKey));
      }
    });
  }

  formatPrice(price: string): string {
    // Remove any non-digit characters
    const numericPrice = price.replace(/\D/g, '');
    
    // Format with thousand separators for VND
    return new Intl.NumberFormat('vi-VN').format(Number(numericPrice));
  }

}
