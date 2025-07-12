const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  updateProgress,
  getWatchHistory,
   getContinueWatching
} = require('../controllers/watchHistoryController');
const requireActiveProfile = require('../middleware/requireActiveProfile');

router.use(auth);

router.post('/update', updateProgress);
router.get('/', getWatchHistory);
router.get('/continue-watching', getContinueWatching);
router.use(auth);              // Must be logged in
router.use(requireActiveProfile);        // Must have active profile


module.exports = router;
