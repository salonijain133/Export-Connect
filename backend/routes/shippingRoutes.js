const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  getAssignedOrders,
  updateShippingStatus
} = require('../controllers/shippingController');

const router = express.Router();

router.get('/assigned-orders', protect, authorize('shipper'), getAssignedOrders);
router.patch('/update-status/:orderId', protect, authorize('shipper'), updateShippingStatus);

module.exports = router;
