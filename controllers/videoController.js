const Video = require('../models/Video');
const path = require('path');
const fs = require('fs');




exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const filePath = path.resolve(video.filePath);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      res.status(416).send('Requires Range header');
      return;
    }

    const CHUNK_SIZE = 1 * 1e6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Streaming error' });
  }
};
// controllers/videoController.js
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, genre } = req.body;

    const videoFile = req.files['video']?.[0];
    const thumbnailFile = req.files['thumbnail']?.[0];

    console.log('Body:', req.body);
    console.log('Video File:', videoFile);
    console.log('Thumbnail File:', thumbnailFile);
    console.log('User:', req.user);

    if (!videoFile) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    const video = await Video.create({
      title,
      description,
      genre, // ✅ added genre field
      filePath: videoFile.path,
      thumbnailPath: thumbnailFile?.path || null,
      uploadedBy: req.user._id,
    });

    console.log('✅ Video saved:', video);

    res.status(201).json(video);
  } catch (err) {
    console.error('❌ Upload Failed:', err);
    res.status(500).json({ error: 'Upload failed', reason: err.message });
  }
};



exports.deleteVideo = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    await video.deleteOne();
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
};
