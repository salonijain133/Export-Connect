const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const shippingRoutes = require('./routes/shippingRoutes.js');
const chatbotRoutes = require('./routes/chatbotRoutes.js');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ DB connection (serverless-safe)
let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// ✅ Ensure DB connects before handling any request
app.use(async (req, res, next) => {
  await connectDatabase();
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Optional test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ IMPORTANT: export app (NO app.listen)
module.exports = app;
