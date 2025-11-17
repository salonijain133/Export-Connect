const Order = require('../models/orderModel');
const crypto = require('crypto');
const User = require('../models/userModel');

const generateTrackingNumber = (orderId) => {
  const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase(); // 4 chars
  return orderId.toString().slice(0, 4).toUpperCase() + randomSuffix;
};

const createOrder = async (req, res) => {
  try {
    const { exporter, products, totalAmount, shippingAddress } = req.body;

    
    const order = await Order.create({
      buyer: req.user._id,
      exporter,
      products,
      totalAmount,
      shippingAddress
    });
    console.log('Order created:', order);

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
  }
};

const getOrdersForBuyer = async (req, res) => {
  try {
    const buyerId = req.user._id; 
    const orders = await Order.find({ buyer: buyerId }).populate('exporter shipper').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders for buyer' });
  }
};


const getOrdersForExporter = async (req, res) => {
  try {
    const exporterId = req.user._id;
    const orders = await Order.find({ exporter: exporterId }).populate('buyer shipper').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders for exporter' });
  }
};


const getOrdersForShipper = async (req, res) => {
  try {
    const shipperId = req.user._id;
    const orders = await Order.find({ shipper: shipperId }).populate('buyer exporter').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders for shipper' });
  }
};


const assignShipper = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { shipperId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const trackingNumber = generateTrackingNumber(order._id);

    // Add tracking info after order is created
    order.trackingInfo = {
      trackingNumber: trackingNumber,
      status: 'Pending',
    };

    order.shipper = shipperId;
    await order.save();

    res.json({ success: true, message: 'Shipper assigned successfully', data: order });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning shipper', error });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  console.log('Updating order status:', orderId, status);

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (status) order.trackingInfo.status = status;

  await order.save();
  res.json({ success: true, message: 'Order updated', data: order });
};

const getAllShippers = async (req, res) => {
  try {
    const shippers = await User.find({ role: 'shipper' }).select(
      'name email contactNumber companyName companyDetails ratings reviewsCount address'
    );
    res.status(200).json({ success: true, data: shippers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch shippers', error: error.message });
  }
};


module.exports = {
    createOrder,
    getOrdersForBuyer,
    getOrdersForExporter,
    getOrdersForShipper,
    assignShipper,
    updateOrderStatus,
    getAllShippers
}