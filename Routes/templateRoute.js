const express = require('express');
const router = express.Router();
const Template = require('../models/templates');

// Route to save a new template
router.post('/api/templates', async (req, res) => {
    const { name, message } = req.body;

    try {
        const newTemplate = new Template({ name, message });
        await newTemplate.save();
        res.status(201).json({ success: true, message: 'Template saved successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error saving template.', error: error.message });
    }
});

// Route to get all templates
router.get('/api/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json({ success: true, templates });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching templates.', error: error.message });
    }
});

// Route to delete a template
router.delete('/api/templates/:id', async (req, res) => {
    const templateId = req.params.id;

    try {
        const deletedTemplate = await Template.findByIdAndDelete(templateId);
        if (!deletedTemplate) {
            return res.status(404).json({ success: false, message: 'Template not found.' });
        }
        res.status(200).json({ success: true, message: 'Template deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting template.', error: error.message });
    }
});

// Route to get a single template by ID
router.get('/api/templates/:id', async (req, res) => {
    const templateId = req.params.id;

    try {
        const template = await Template.findById(templateId);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found.' });
        }
        res.status(200).json({ success: true, template });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching template.', error: error.message });
    }
});


module.exports = router;
