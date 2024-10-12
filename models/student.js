const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    matric_number: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }]
});

module.exports = mongoose.model('Student', studentSchema);
