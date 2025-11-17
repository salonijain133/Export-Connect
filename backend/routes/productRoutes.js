const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Only exporter can create/update/delete
router.post(
    '/',
    protect,
    authorize('exporter'),
    upload.single('image'),
    createProduct
  );  
router.put('/:id', protect, authorize('exporter'), updateProduct);
router.delete('/:id', protect, authorize('exporter'), deleteProduct);

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;