const express = require('express');
const upload = require('../multerConfig');
const uploadController = require('../controllers/uploadController');
const Student = require('../models/student');


const router = express.Router();

router.get('/students/:level', uploadController.getStudentsByLevel);

router.post('/upload-result', upload.single('file'), uploadController.uploadResult); 

module.exports = router;
