// routes/videoRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadVideo, streamVideo,deleteVideo } = require('../controllers/videoController');
const requireActiveProfile = require('../middleware/requireActiveProfile');

// Admin-only video + thumbnail upload

// Public streaming
router.get('/stream/:id', streamVideo);
router.delete('/:id', auth, deleteVideo);

router.post(
  '/upload',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  auth,
 admin,
  uploadVideo
);
router.use(auth);              // Must be logged in
router.use(requireActiveProfile);        // Must have active profile



module.exports = router;




