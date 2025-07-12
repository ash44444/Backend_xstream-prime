// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login,logoutUser  } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// Register
router.post('/register', register);

// Login
router.post('/login', login);
router.post('/logout', auth, logoutUser);

module.exports = router;
