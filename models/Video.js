const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  filePath: { type: String, required: true }, // video path
  thumbnailPath: String,                      // new field for thumbnail
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  genre: {
  type: String,
  enum: ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Kids', 'Documentary'], // You can expand this
  required: true
}

}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);