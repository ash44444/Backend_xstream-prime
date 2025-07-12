// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create folder if not exists
function ensureUploadPath(uploadPath) {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';

    if (file.mimetype.startsWith('video')) {
      folder = 'uploads/videos';
    } else if (file.mimetype.startsWith('image')) {
      folder = 'uploads/thumbnails';
    }

    ensureUploadPath(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
