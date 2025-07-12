// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ✅ POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // Optional: allow isAdmin creation only if explicitly passed (remove in production)
    const user = await User.create({ name, email, password, isAdmin: !!isAdmin });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // ✅ include admin flag
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // ✅ include admin flag
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// ✅ POST /api/auth/logout
exports.logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      activeProfile: null,
    });

    res.status(200).json({ message: 'Logout successful, active profile reset' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
};

