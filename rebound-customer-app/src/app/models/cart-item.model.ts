import { Product } from './product.model'; // Assuming you have the Product model defined

export interface CartItem {
  product: Product;
  quantity: number;
}
