const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address is required'],
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Do not return password on queries
  },
  role: {
    type: String,
    enum: ['exporter', 'buyer', 'shipper', 'admin'],
    required: true
  },
  companyName: {
    type: String,
    required: function () {
      return this.role === 'exporter' || this.role === 'shipper';
    }
  },
  companyDetails: {
    licenseNumber: { type: String },
    gstNumber: { type: String },
    country: { type: String },
    website: { type: String }
  },
  // profileImage: {
  //   type: String, // URL to image (optional)
  //   default: null
  // },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },
  contactNumber: {
    type: String,
    match: [/^[0-9\-\+]{9,15}$/, 'Invalid phone number'],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);