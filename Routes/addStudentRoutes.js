const express = require('express');
const Student = require('../models/student'); // Ensure path is correct

const router = express.Router();

router.post('/add-student', async (req, res) => {
    const { name, matric_number, email, phone, address, level, semester, password } = req.body;

    if (!name || !matric_number || !email || !phone || !address || !level || !semester || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const newStudent = new Student({
            name,
            matric_number,
            email,
            phone,
            address,
            level,
            semester,
            password,
        });

        await newStudent.save();
        res.status(200).send('Student added successfully.');
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send('Error adding student.');
    }
});

module.exports = router;
