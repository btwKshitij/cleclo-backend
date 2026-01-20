const express = require('express');
const multer = require('multer');
const { createOrder, checkPrice, uploadImage } = require('../controllers/orderController');
const path = require('path');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/', createOrder);
router.post('/price-check', checkPrice);
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
