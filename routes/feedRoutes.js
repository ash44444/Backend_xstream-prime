const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getUserFeed,
} = require('../controllers/feedController');
const requireActiveProfile = require('../middleware/requireActiveProfile');

router.use(auth);

router.get('/', getUserFeed);
    // Must be logged in
router.use(requireActiveProfile);        // Must have active profile

module.exports = router;
