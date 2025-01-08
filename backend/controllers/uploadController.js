
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Image storage engine
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../upload/images');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); // Ensure directory exists
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const uploadImage = multer({ storage: imageStorage });

// Logo storage engine
const logoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../upload/logos');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); // Ensure directory exists
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const uploadLogo = multer({ storage: logoStorage });
const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT}`;
// Upload image handler
exports.uploadImage = (req, res) => {
    res.json({
        success: 1,
        image_url: `${baseUrl}/images/${req.file.filename}`,
    });
};

// Upload logo handler
exports.uploadLogo = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'Logo upload failed.' });
    }
    res.json({
        success: 1,
        logo_url: `${baseUrl}/logos/${req.file.filename}`,
    });
};


// Multer middlewares
exports.uploadImageMiddleware = uploadImage.single('product');
exports.uploadLogoMiddleware = uploadLogo.single('logo');
