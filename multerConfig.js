const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const path = require('path');

// MongoDB connection URI (use your own MongoDB URI)
const mongoURI = MONGODB_URI;

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        const { matricNumber, level, semester } = req.body;
        
        // Set the filename format
        const fileExtension = path.extname(file.originalname);
        const fileName = `${matricNumber}-${level}-${semester}${fileExtension}`;

        return {
            filename: fileName,
            metadata: {
                matricNumber,
                level,
                semester
            },
            bucketName: 'uploads' // This is the collection name for the files
        };
    }
});

// Set up the multer upload configuration
const upload = multer({ storage });

module.exports = upload;
