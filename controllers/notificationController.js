const db = require('../db');
const sendMail = require('../controllers/sendEmail');

// Notification sending function
const sendNotification = async (subject, message, recipients, sendEmail, sendSMS) => {
    try {
        // Check if recipients are provided
        if (!recipients || recipients.length === 0) {
            return { success: false, error: 'No recipients provided.' };
        }

        if (sendEmail) {
            for (let recipient of recipients) {
                if (!recipient.email) {
                    console.log(`No email for recipient: ${JSON.stringify(recipient)}`);
                    continue; // Skip recipients with no email
                }

                const emailSent = await sendMail({
                    from: 'lasustech.project@hotmail.com',
                    to: recipient.email,
                    subject: subject,
                    text: message,
                    html: `<p>${message}</p>` // HTML content
                });

                if (emailSent) {
                    console.log(`Email sent to: ${recipient.email}`);
                } else {
                    console.log(`Failed to send email to: ${recipient.email}`);
                }
            }
        }

        if (sendSMS) {
            console.log('SMS sending not implemented. Add SMS API logic here.');
        }

        // Return success if everything went well
        return { success: true };
    } catch (error) {
        console.log('Error sending notification:', error);
        return { success: false, error: error.message }; // Return error details
    }
};

// Controller to handle notification request
const handleNotificationRequest = async (req, res) => {
    const { subject, message, recipients, sendEmail, sendSMS } = req.body;

    // Validate request data
    if (!subject || !message || !recipients) {
        return res.status(400).send({ error: 'Subject, message, and recipients are required.' });
    }

    const result = await sendNotification(subject, message, recipients, sendEmail, sendSMS);

    if (result.success) {
        return res.status(200).send({ message: 'Notifications sent successfully!' });
    } else {
        return res.status(500).send({ error: result.error });
    }
};

module.exports = { handleNotificationRequest };
