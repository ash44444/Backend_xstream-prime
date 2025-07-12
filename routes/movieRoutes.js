const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addMovie,
  getAllMovies,
  searchMovies
} = require('../controllers/movieController');

// Authenticated Routes
router.use(auth);

router.post('/', addMovie);            // POST /api/movies
router.get('/', getAllMovies);         // GET /api/movies
router.get('/search', searchMovies);   // GET /api/movies/search?keyword=...

module.exports = router;
