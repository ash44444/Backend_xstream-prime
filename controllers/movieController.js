const Movie = require('../models/Movie');

// Admin: Add Movie
exports.addMovie = async (req, res) => {
  try {
    const { title, description, category, thumbnail } = req.body;

    const movie = await Movie.create({
      title,
      description,
      category,
      thumbnail,
      createdBy: req.user._id,
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Movie creation failed', message: err.message });
  }
};

// Get All Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Search by title or category
exports.searchMovies = async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = {
      $or: [
        { title: new RegExp(keyword, 'i') },
        { category: new RegExp(keyword, 'i') },
      ],
    };

    const results = await Movie.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};
