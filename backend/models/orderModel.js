const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  trackingInfo: {
    trackingNumber: String,
    status: {
      type: String,
      enum: ['Pending', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Cancelled'],
      default: 'Pending'
    },
    estimatedDelivery: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);