const router = require('express').Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Create new product
router.post('/', productController.createProduct);

// Get single product
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;