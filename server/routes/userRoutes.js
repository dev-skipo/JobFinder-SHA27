const express = require('express');
const { registerUser, loginUser, getUserById, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById); // user by ID
router.put('/:id', authMiddleware, updateUser); // user (settings)

module.exports = router;