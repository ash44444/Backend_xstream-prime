// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const movieRoutes = require('./routes/movieRoutes');
const videoRoutes = require('./routes/videoRoutes');
const feedRoutes = require('./routes/feedRoutes');
const watchHistoryRoutes = require('./routes/watchHistoryRoutes');

dotenv.config();
connectDB(); // MongoDB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/watch-history', watchHistoryRoutes);
app.use('/api/feed', feedRoutes);
// app.js
app.use('/uploads/videos', express.static('uploads/videos'));
app.use('/uploads/thumbnails', express.static('uploads/thumbnails'));


// Health check
app.get('/', (req, res) => {

  res.send('🎬 XStream-Prime Backend is Live!');
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

module.exports = app;
