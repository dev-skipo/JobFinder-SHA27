// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { fullName, email, password, country, city, address, zipCode, phoneNumber } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword, country, city, address, zipCode, phoneNumber });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, userId: user._id }); // Return user ID along with token
    } catch (error) {
        res.status(500).json({ error });
    }
};

// New function to get user details by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};


// New function to update user profile
exports.updateUser = async (req, res) => {
    try {
        const { fullName, email, country, city, address, zipCode, phoneNumber } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { fullName, email, country, city, address, zipCode, phoneNumber },
            { new: true } // Return the updated document
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};