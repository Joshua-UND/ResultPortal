const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const { matricNumber, level, semester } = req.body;

        const fileExtension = path.extname(file.originalname);
        const fileName = `${matricNumber}-${level}-${semester}${fileExtension}`;
        
        cb(null, fileName);
    }
});

const upload = multer({ storage });

module.exports = upload;
