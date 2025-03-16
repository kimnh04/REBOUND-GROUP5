import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { RetrieveProductService } from '../retrieve-products.service';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProductDetailComponent implements OnInit {
  mainProduct!: Product | null;
  relatedProducts: Product[] = [];
  allProducts: Product[] = [];
  quantity: number = 1;
  productId: string = '';
  showAnnouncement = false;

  constructor(
    private productService: RetrieveProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = id;
        this.fetchProductData();
      }
    });
  }

  fetchProductData(): void {
    this.productService.getProducts().subscribe(products => {
      if (products.length === 0) {
        console.warn('No products retrieved from service');
        return;
      }

      this.allProducts = products;
      this.mainProduct = this.allProducts.find(product =>
        product.Product_ID === this.productId
      ) ?? null;

      if (this.mainProduct) {
        console.log('Found Main Product:', this.mainProduct);
        this.updateRelatedProducts();
      } else {
        console.warn(`No product found for ID: ${this.productId}`);
      }
    });
  }

  updateRelatedProducts(): void {
    if (this.mainProduct) {
      this.relatedProducts = this.allProducts
        .filter(product =>
          product.Product_ID !== this.mainProduct?.Product_ID &&
          product.Product_Category === this.mainProduct?.Product_Category
        )
        .slice(0, 4);
    }
  }

  formatPrice(price: string): string {
    const numericPrice = price.replace(/\D/g, '');
    return new Intl.NumberFormat('vi-VN').format(Number(numericPrice)) + ' VND';
  }

  showProductDetails(product: Product): void {
    this.mainProduct = product;
    this.quantity = 1; // Reset quantity
    this.updateRelatedProducts(); // Refresh related products
  }

  convertPrice(price: string | null | undefined): string {
    const extractedPrice = price?.replace(/\D/g, '') ?? '0'; // Default to '0' if no price is provided
    return new Intl.NumberFormat('vi-VN').format(Number(extractedPrice)) + ' VND';
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.mainProduct) {
        this.cartService.addToCart(this.mainProduct, this.quantity);
        this.showAnnouncement = true;  // Add this line to show the announcement
        setTimeout(() => {
            this.showAnnouncement = false;
        }, 3000);
    }
}

  validateQuantity(): void {
    if (this.quantity < 1) {
      this.quantity = 1; // Prevent invalid quantity
    }
  }

}
