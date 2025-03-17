const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Product_ID: { type: String, required: true },
  Product_Name: { type: String, required: true },
  Product_Image: { type: String, required: true },
  Product_Price: { type: String, required: true },
  Product_Description: { type: String, required: true },
  Product_Category: { type: String, required: true },
  Product_Status: { type: String, required: true },
  Product_Origin: { type: String, required: true },
  Product_Stock: { type: Number, required: true },
  Product_Customize: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }  // Add this line
}, {
  timestamps: true  // This will add createdAt and updatedAt fields automatically
});

const Product = mongoose.model('product', productSchema, "product");

module.exports = Product;