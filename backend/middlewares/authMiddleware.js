const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/user');

const protect = async (req, res, next) => {
    console.log('req received by middleware')
    let token = req.headers.authorization?.split(' ')[1];
    console.log("token:",token)
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded:",decoded)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { protect };