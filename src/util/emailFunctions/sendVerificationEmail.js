const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendVerificationEmail = async (user) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        const url = process.env.APPLICATION_URL + '/api/auth/verify-email/' + token
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: user.email,
            subject: 'Welcome to KaraFi! Email Verification.',
            html:
            `<html>
            <head>
            <title>Verification Link</title>
            </head>
            <body>
              <h1>Hello!</h1>
              <p>Thank you for signing up for our service. To complete your registration, please click the following link:</p>
              <p><a href="${url}">Verify my email address</a></p>
              <p>If you did not sign up for our service, you can safely ignore this email.</p>
            </body>
            </html>`
        }
        await transporter.sendMail(mailOptions)
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = sendVerificationEmail