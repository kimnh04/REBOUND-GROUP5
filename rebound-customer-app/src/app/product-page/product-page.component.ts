import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetrieveProductService } from '../retrieve-products.service';
import { NavigationService } from '../navigation.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedCategory: string = '';
  private firstLoad = true;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: RetrieveProductService,
    private navigationService: NavigationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('ProductPageComponent initialized');

    // Get category from URL
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const categoryFromUrl = params.get('category');
        if (categoryFromUrl) {
          this.selectedCategory = categoryFromUrl;
          this.navigationService.selectCategory(categoryFromUrl);
        }
      })
    );

    // Fetch products from MongoDB API
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        if (products && products.length > 0) {
          console.log('All products retrieved:', products.length);
          this.navigationService.setAllProducts(products);

          // Get category from URL and filter products
          const categoryFromUrl = this.route.snapshot.paramMap.get('category');
          if (categoryFromUrl) {
            console.log('Filtering by category:', categoryFromUrl);
            this.selectedCategory = categoryFromUrl;
            this.products = products.filter(product =>
              product.Product_Category === categoryFromUrl
            );
            console.log('Filtered products:', this.products.length);
          } else {
            this.products = products;
            this.selectedCategory = 'All Products';
          }
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });

    // Listen for category changes
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const category = params.get('category');
        if (category) {
          console.log('Category changed to:', category);
          this.selectedCategory = category;
          this.filterProductsByCategory(category);
        }
      })
    );

    // Listen for filtered products
    this.subscriptions.add(
      this.navigationService.filteredProducts$.subscribe(filteredProducts => {
        console.log('Filtered products updated:', filteredProducts);
        this.products = filteredProducts;

        if (!this.firstLoad) {
          setTimeout(() => this.scrollToProducts(), 200);
        }
      })
    );

    setTimeout(() => {
      this.firstLoad = false;
    }, 500);

    // Subscribe to both URL parameters and query parameters
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const categoryFromUrl = params.get('category');
        if (categoryFromUrl) {
          this.selectedCategory = categoryFromUrl;
          this.navigationService.selectCategory(categoryFromUrl);
        }
      })
    );

    // Add this new subscription for search queries
    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const searchQuery = params['search'];
        if (searchQuery) {
          console.log('Search query received:', searchQuery);
          this.handleSearch(searchQuery);
        }
      })
    );

    // Combined subscription for both params and query params
    this.subscriptions.add(
      this.route.queryParamMap.subscribe(params => {
        const searchQuery = params.get('search');
        if (searchQuery) {
          console.log('Search query received:', searchQuery);
          this.handleSearch(searchQuery);
        } else {
          // Get category from URL if no search query
          const categoryFromUrl = this.route.snapshot.paramMap.get('category');
          if (categoryFromUrl) {
            this.selectedCategory = categoryFromUrl;
            this.navigationService.selectCategory(categoryFromUrl);
          }
        }
      })
    )
  }

  formatPrice(price: string): string {
    // Remove any non-digit characters
    const numericValue = price.replace(/\D/g, '');

    // Format with thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToProductDetail(product: Product) {
    console.log('Navigating to product:', product);
    if (product.Product_ID) {
      console.log('Attempting navigation to:', '/product-detail/' + product.Product_ID);
      this.router.navigate(['/product-detail', product.Product_ID])
        .then(success => {
          console.log('Navigation success:', success);
        })
        .catch(error => {
          console.error('Navigation failed:', error);
        });
    } else {
      console.error('Product ID is missing:', product);
    }
  }

  scrollToProducts() {
    const productSection = document.getElementById('products-section');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('products-section element not found');
    }
  }

  private filterProductsByCategory(category: string) {
    console.log('Starting to filter products for category:', category);
    
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('Total products received:', products?.length || 0);
        
        if (products && products.length > 0) {
          // Log all unique categories in the database
          const availableCategories = [...new Set(products.map(p => p.Product_Category))];
          console.log('Available categories in database:', availableCategories);
          
          this.products = products.filter(product => {
            // Log each product's category for comparison
            console.log(`Comparing product category "${product.Product_Category}" with "${category}"`);
            return product.Product_Category === category;
          });
          
          console.log(`Found ${this.products.length} products for category:`, category);
          
          // Force change detection
          this.products = [...this.products];
  
          // Add scroll after a short delay to ensure DOM is updated
          setTimeout(() => this.scrollToProducts(), 200);
        } else {
          console.warn('No products available to filter');
          this.products = [];
        }
      },
      error: (error) => {
        console.error('Error filtering products:', error);
        this.products = [];
      }
    });
  }

  private handleSearch(query: string) {
    if (!query) return;

    console.log('Starting search for:', query);
    this.selectedCategory = `Search results for "${query}"`;
    const searchTerm = query.toLowerCase().trim();

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('Total products before filtering:', products?.length || 0);

        if (!products || products.length === 0) {
          console.warn('No products available to search');
          this.products = [];
          return;
        }

        this.products = products.filter(product => {
          if (!product) return false;

          const name = product.Product_Name?.toLowerCase() || '';
          const description = product.Product_Description?.toLowerCase() || '';

          return name.includes(searchTerm) || description.includes(searchTerm);
        });

        console.log('Found', this.products.length, 'matching products');

        // Force change detection
        this.products = [...this.products];

        // Update navigation service
        this.navigationService.setAllProducts(this.products);

        // Scroll to results after a short delay
        setTimeout(() => this.scrollToProducts(), 200);
      },
      error: (error) => {
        console.error('Error during search:', error);
        this.products = [];
      }
    });
  }
}