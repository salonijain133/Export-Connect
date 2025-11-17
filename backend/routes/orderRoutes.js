const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getOrdersForBuyer,
  getOrdersForExporter,
  getOrdersForShipper,
  assignShipper,
  updateOrderStatus,
  getAllShippers
} = require('../controllers/orderController');

const router = express.Router();

// Buyer creates an order
router.post('/', protect, authorize('buyer'), createOrder);

// Buyer views their orders
router.get('/buyer', protect, authorize('buyer'), getOrdersForBuyer);

// Exporter views incoming orders
router.get('/exporter', protect, authorize('exporter'), getOrdersForExporter);

// Shipper views incoming orders
router.get('/shipper', protect, authorize('shipper'), getOrdersForShipper);

// Exporter assigns shipper
router.patch('/:orderId/assign-shipper', protect, authorize('exporter'), assignShipper);

// Exporter order updates status
router.patch('/:orderId/status', protect, authorize('exporter', 'shipper'), updateOrderStatus);

// Exporter views avaiable shippers
router.get('/all-shippers', protect, authorize('exporter'), getAllShippers);
module.exports = router;