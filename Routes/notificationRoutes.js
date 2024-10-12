const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const { handleNotificationRequest } = require('../controllers/notificationController');

// Fetch students for individual notification (filtered by level)
router.get('/api/students/level/:level', async (req, res) => {
    const { level } = req.params;

    try {
        const students = await Student.find({ level: parseInt(level) });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching students.', error: error.message });
    }
});

// Fetch all students
router.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().lean();  // Use .lean() to get plain JS objects
        res.json({ success: true, students });  // Send only necessary data
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching students', error: error.message });
    }
});

router.post('/send-notification', handleNotificationRequest);

module.exports = router;
