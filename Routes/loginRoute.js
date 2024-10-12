const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/login', async (req, res) => {
    const { userType, matric_number, password, username } = req.body;

    if (userType === 'student') {
        try {
            const student = await Student.findOne({ matric_number, password });
            if (student) {
                req.session.user = student;
                return res.redirect('/studentPortal');
            } else {
                return res.status(401).send('Invalid matriculation number or password');
            }
        } catch (error) {
            return res.status(500).send('Internal server error');
        }
    } else if (userType === 'admin') {
        if (username === 'Computer Science Dept' && password === 'LasustechAdmin') {
            req.session.admin = true;
            return res.redirect('/admin');
        } else {
            return res.status(401).send('Invalid admin credentials');
        }
    } else {
        return res.status(400).send('Invalid user type');
    }
});

router.get('/student-data', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const student = await Student.findById(req.session.user._id).populate('results');
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
