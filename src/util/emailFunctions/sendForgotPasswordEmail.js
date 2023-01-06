const nodemailer = require('nodemailer')
const sendForgotPasswordEmail = async(user) => {
    try {
        const url = process.env.APPLICATION_URL + '/api/auth/reset/' + user.resetPasswordToken
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
            subject: 'KaraFi Reset Password!',
            html:
            `<html>
            <head>
            <title>Reset Password</title>
            </head>
            <body>
              <h1>Hello!</h1>
              <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process:</p>
              <p><a href="${url}">Reset Password</a></p>
              <p>Please note the link will expire in next 1 Hour.</p>
            </body>
            </html>`
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = sendForgotPasswordEmail