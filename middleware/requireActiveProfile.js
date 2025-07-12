module.exports = (req, res, next) => {
  if (!req.user || !req.user.activeProfile) {
    return res.status(403).json({ message: 'Please select a profile to continue' });
  }
  next();
};
