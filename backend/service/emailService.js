const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,  // Use environment variable
                pass: process.env.GOOGLE_APP_PASSCODE  // Use App Password from Google
            }
        });

        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,  // Use the to parameter
            subject: subject,
            text: text  // Use the text parameter
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;