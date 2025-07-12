// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProfile,
  getProfiles,
  switchProfile,
  deleteProfile
} = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply middleware to all routes
router.use(authMiddleware);

// POST /api/profiles
router.post('/', createProfile);
router.post('/switch/:profileId', switchProfile); // NEW!

// GET /api/profiles
router.get('/', getProfiles);

// DELETE /api/profiles/:id
router.delete('/:id', deleteProfile);

module.exports = router;
