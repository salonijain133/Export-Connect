const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtHelper');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
    const {
        name,
        email,
        password,
        role,
        companyName,
        companyDetails,
        contactNumber,
        address
    } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            companyName,
            companyDetails,
            contactNumber,
            address
        });

        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    companyName: user.companyName,
                    companyDetails: user.companyDetails,
                    contactNumber: user.contactNumber,
                    address: user.address,
                    isVerified: user.isVerified,
                    ratings: user.ratings,
                    reviewsCount: user.reviewsCount
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password'); // Include password for comparison

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyName: user.companyName,
                companyDetails: user.companyDetails,
                contactNumber: user.contactNumber,
                address: user.address,
                isVerified: user.isVerified,
                ratings: user.ratings,
                reviewsCount: user.reviewsCount
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            message: 'Login failed',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

// Get user info from token
const getUser = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyName: user.companyName,
                companyDetails: user.companyDetails,
                contactNumber: user.contactNumber,
                address: user.address,
                isVerified: user.isVerified,
                ratings: user.ratings,
                reviewsCount: user.reviewsCount
            }
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Failed to authenticate token', error });
    }
};

module.exports = { registerUser, loginUser, getUser };
