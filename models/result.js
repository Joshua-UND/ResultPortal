const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    level: {
        type: Number,
        enum: [100, 200, 300, 400], // Ensure level is valid
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    result_url: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Result', resultSchema);
