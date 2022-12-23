const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendVerificationEmail = async (user) => {
    try {
        // Generate the verification token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: user.email,
            subject: 'Email verification',
            html:
            `<p>Please click the following link to verify your email address:</p>
                <p>
                    <a href="http://localhost:3000/api/verify-email/${token}">http://localhost:3000/api/verify-email/${token}
                </a>
            </p>`
        };
        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw new Error(err);
    }
}
module.exports = sendVerificationEmail