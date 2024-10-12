const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Result = require('../models/result');

// Route to get results for a student by level (fetching both semesters)
router.get('/results/:studentId/:level', async (req, res) => {
    const { studentId, level } = req.params;
    try {
        const results = await Result.find({ studentId, level }).sort({ semester: 1 }); // Fetch both semesters and sort by semester
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get students by level
router.get('/students/:level', async (req, res) => {
    const level = parseInt(req.params.level);  // Get level from route parameter
    try {
        const students = await Student.find({ level }).populate('results');
        res.json(students);  // Send student data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
