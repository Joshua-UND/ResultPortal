const db = require('../db'); // Ensure paths are correct
const Result = require('../models/result'); // Ensure paths are correct
const Student = require('../models/student'); // Ensure paths are correct
const sendEmail = require('../controllers/sendEmail'); // Adjust the path according to your project structure

const getStudentsByLevel = async (req, res) => {
    try {
        const level = parseInt(req.params.level, 10); // Parse level as an integer
        const students = await Student.find({ level }); // Use the level field in the Student collection
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
};

const uploadResult = async (req, res) => {
    const file = req.file;
    const { matricNumber, level, semester, name } = req.body;

    if (!file || !matricNumber || !level || !semester) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const numericLevel = parseInt(level);

        if (isNaN(numericLevel)) {
            console.error(`Invalid level value: ${level}`);
            return res.status(400).json({ message: 'Invalid level value' });
        }

        const student = await Student.findOne({ matric_number: matricNumber });

        if (!student) {
            console.error(`Student not found with matric number: ${matricNumber}`);
            return res.status(404).json({ message: 'Student not found' });
        }

        const existingResult = await Result.findOne({
            studentId: student._id,
            level: numericLevel,
            semester
        });

        if (existingResult) {
            const errorMessage = `Result for student "${matricNumber}" level: "${numericLevel}" semester: "${semester}" has already been uploaded.`;
            console.error(errorMessage);
            return res.status(400).json({ message: errorMessage });
        }

        const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px;
                    background: #007bff;
                    color: #ffffff;
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    background: #f4f4f4;
                    color: #666666;
                    border-radius: 0 0 8px 8px;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Result Uploaded</h1>
                </div>
                <div class="content">
                    <p>Dear ${name},</p>
                    <p>Your <strong>${numericLevel}</strong> Level, Semester <strong>${semester}</strong> result has been successfully uploaded to the portal.</p>
                    <p>Please check the portal to review your results. If you have any questions, feel free to reach out to us.</p>
                    <p>Best regards,<br>Lagos State University Of Science and Technology</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Lagos State University Of Science and Technology. All rights reserved.</p>
                    <p style="font-size: 12px; color: #888;">
                    <i>Disclaimer: This website is built for testing/projects purposes and does not represent the official institution.</i>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;

        // Send email and check if successful
        const emailSent = await sendEmail({
            from: 'lasustech.project@hotmail.com',
            to: student.email,
            subject: 'Result Uploaded',
            html: emailHtml
        });

        if (!emailSent) {
            return res.status(500).json({ message: 'Error sending email' });
        }

        // Proceed with file upload only if email was sent successfully
        const filePath = `/uploads/${file.filename}`;

        const result = await Result.create({
            studentId: student._id,
            matric_number: matricNumber,
            level: numericLevel,
            semester,
            result_url: filePath
        });

        console.log("Result uploaded to database:", result);

        student.results.push(result._id);
        await student.save();

        res.json({ message: 'Result uploaded successfully' });
    } catch (error) {
        console.error('Error uploading result:', error.message);
        res.status(500).json({ message: 'Error uploading result' });
    }
};

module.exports = {
    getStudentsByLevel,
    uploadResult
};
