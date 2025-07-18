const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

  

req.user = user; // after decoding JWT

if (user.activeProfile) {
  req.user.activeProfile = user.activeProfile;
}
 next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

