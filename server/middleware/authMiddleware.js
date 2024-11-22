// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;