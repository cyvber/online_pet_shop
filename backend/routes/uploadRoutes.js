const express = require('express');
const router = express.Router();
const {
    uploadImage,
    uploadLogo,
    uploadImageMiddleware,
    uploadLogoMiddleware,
} = require('../controllers/uploadController');

// Upload image route
router.post('/image', uploadImageMiddleware, uploadImage);

// Upload logo route
router.post('/logo', uploadLogoMiddleware, uploadLogo);

module.exports = router;
