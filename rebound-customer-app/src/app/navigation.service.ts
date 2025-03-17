import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private selectedSectionSource = new BehaviorSubject<string>(''); // General navigation section
  selectedSection$ = this.selectedSectionSource.asObservable();

  private selectedCategorySource = new BehaviorSubject<string>('Premium Jewelry'); // Default category
  selectedCategory$ = this.selectedCategorySource.asObservable();

  private allProducts: Product[] = [];
  private filteredProductsSource = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSource.asObservable();

  navigateToSection(section: string): void {
    this.selectedSectionSource.next(section);
  }

  selectCategory(category: string): void {
    console.log('Category selection triggered:', category);
    this.selectedCategorySource.next(category);
    this.filterProducts(category); // Ensure filtering happens immediately
  }

  setAllProducts(products: Product[]): void {
    console.log('Setting all products. Total:', products.length);
    this.allProducts = products;
    this.filterProducts(this.selectedCategorySource.getValue()); // Ensure filtering applies after setting
  }

  private filterProducts(query: string): Product[] {
    if (!query) return this.allProducts;
    
    const searchTerm = query.toLowerCase().trim();
    return this.allProducts.filter(product => {
      if (!product) return false;
      
      const name = product.Product_Name?.toLowerCase() || '';
      const description = product.Product_Description?.toLowerCase() || '';
      
      return name.includes(searchTerm) || description.includes(searchTerm);
    });
  }

  private convertPrice(price: string | null | undefined): number {
    if (!price) return 0;
    const extractedPrice = price.replace(/[^\d]/g, '');
    return isNaN(parseFloat(extractedPrice)) ? 0 : parseFloat(extractedPrice);
  }
}
