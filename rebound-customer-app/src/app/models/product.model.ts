export interface Product {
  Product_ID: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: string
  Product_Description: string;
  Product_Category: string;
  Product_Status: string;
  Product_Origin: string;
  Product_Stock: number;
  Product_Customize?: string;  // Optional field (? means optional)
  createdAt?: Date;
  updatedAt?: Date;
}