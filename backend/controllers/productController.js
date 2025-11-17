const Product = require('../models/productModel');

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, category, pricePerUnit, unit, availableQuantity, originCountry, certifications } = req.body;

    const product = new Product({
      exporter: req.user.id,
      name,
      description,
      category,
      pricePerUnit,
      unit,
      availableQuantity,
      originCountry,
      certifications,
      image: req.file.path
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get all products (public)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate('exporter', 'name companyName');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('exporter', 'name companyName');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    // Parse fields from body or fallback to req.body (for JSON)
    const updates = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      pricePerUnit: req.body.pricePerUnit || req.body.price, // adjust for frontend
      unit: req.body.unit,
      availableQuantity: req.body.availableQuantity,
      originCountry: req.body.originCountry,
      certifications: req.body.certifications,
    };

    // If file is uploaded
    if (req.file) {
      updates.image = req.file.path;
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, exporter: req.user._id },
      { $set: updates },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    res.json(product);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ message: err.message });
  }
};


// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      exporter: req.user._id
    });
    if (!product) return res.status(404).json({ message: 'Product not found or not authorized' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};