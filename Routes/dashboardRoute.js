const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/student');

router.get('/dashboard-data', async (req, res) => {
    try {
        const levels = [100, 200, 300, 400];
        let totalStudents = 0;
        const levelCounts = {};

        for (const level of levels) {
            const count = await Student.countDocuments({ level });
            levelCounts[`level${level}`] = count;
            totalStudents += count;
        }

        res.json({
            totalStudents,
            level100: levelCounts['level100'],
            level200: levelCounts['level200'],
            level300: levelCounts['level300'],
            level400: levelCounts['level400']
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Error retrieving data' });
    }
});

module.exports = router;
