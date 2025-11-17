const Order = require('../models/orderModel');

// Get all orders assigned to a shipper
const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shipper: req.user._id })
      .populate('buyer exporter products.product');

    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
  }
};

// Update shipping status for a particular order
const updateShippingStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ _id: orderId, shipper: req.user._id });

    if (!order) return res.status(404).json({ success: false, message: 'Order not found or not assigned to this shipper' });

    if (status) order.trackingInfo.status = status;

    await order.save();

    res.json({ success: true, message: 'Shipping status updated', data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
  }
};

module.exports = {
    getAssignedOrders,
    updateShippingStatus
};
