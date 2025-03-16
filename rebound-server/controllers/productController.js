const Product = require('../models/Product');

const productController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            console.log("📦 Found products:", products.length);
            res.json(products);
        } catch (err) {
            console.error("❌ Error fetching products:", err);
            res.status(500).json({ error: "Failed to fetch products" });
        }
    },

    // Create new product
    createProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            console.log("✅ Product created:", savedProduct._id);
            res.status(201).json(savedProduct);
        } catch (err) {
            console.error("❌ Error creating product:", err);
            res.status(500).json({ error: "Failed to create product", details: err.message });
        }
    },

    // Get single product
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (err) {
            console.error("❌ Error fetching product:", err);
            res.status(500).json({ error: "Failed to fetch product" });
        }
    },

    // Update product
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            console.log("✏️ Product updated:", req.params.id);
            res.json(updatedProduct);
        } catch (err) {
            console.error("❌ Error updating product:", err);
            res.status(500).json({ error: "Failed to update product" });
        }
    },

    // Delete product
    deleteProduct: async (req, res) => {
        try {
            // Use getProductById to find the product by ID
            const product = await Product.getProductById(req.params.id);
            
            // If the product does not exist, return a 404 error
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
    
            // Now that we have the product, delete it using the `remove()` method
            await product.remove();  // This will delete the product from the database
    
            console.log("🗑️ Product deleted:", req.params.id);
            res.json({ message: "Product deleted successfully" });
        } catch (err) {
            console.error("❌ Error deleting product:", err);
            res.status(500).json({ error: "Failed to delete product" });
        }
    }
};

module.exports = productController;