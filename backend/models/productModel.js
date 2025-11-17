const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  exporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Fruits',
      'Vegetables',
      'Grains',
      'Spices',
      'Dairy',
      'Meat',
      'Seafood',
      'Beverages',
      'Handicrafts',
      'Textiles',
      'Industrial Goods',
      'Other'
    ]
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  unit: {
    type: String, // e.g. "kg", "ton", "box"
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  image: {
      type: String, // URLs of product images
      required: true
  },
  originCountry: {
    type: String,
    required: true
  },
  certifications: [String], // e.g. Organic, ISO, HACCP
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
