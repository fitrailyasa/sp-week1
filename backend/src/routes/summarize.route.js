const express = require('express');
const multer = require('multer');
const { summarizeDocument } = require('../controllers/summarize.controller');

const router = express.Router();

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
});

// Route untuk upload dan ringkasan dokumen
router.post('/', upload.single('document'), summarizeDocument);

module.exports = router;
