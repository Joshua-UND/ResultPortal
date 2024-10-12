const nodemailer = require('nodemailer');
require('dotenv').config();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false // Bypass unauthorized TLS certificates
    }
});


// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Transporter Verification Error:", error);
    } else {
        console.log("SMTP Transporter is ready to send messages.");
    }
});

// Function to send an email
const sendEmail = async (mailOptions) => {
    try {
        console.log("Sending email with options:", mailOptions);

        // Check if recipients are provided in mailOptions
        if (!mailOptions.to) {
            throw new Error('No recipients defined');
        }

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
        return true; // Email sent successfully
    } catch (error) {
        console.error("Error sending email:", error);
        return false; // Email sending failed
    }
};

module.exports = sendEmail;
