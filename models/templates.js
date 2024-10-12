// templateModel.js
const mongoose = require('mongoose');

// Define the Template schema
const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

// Export the Template model
module.exports = mongoose.model('templates', templateSchema);
