const userSchema = require('../models/user.model')
const roleSchema = require('../models/role.model')
const sendVerificationEmail = require('../util/sendVerificationEmail')
const sendForgotPasswordEmail = require('../util/sendForgotPasswordEmail')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}
const login = async (req, res, next) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.send({ token })
    const user = await userSchema.findByIdAndUpdate(
        req.user.id,
        { token: token }
    )
}
const register = async (req, res, next) => {
    try {
        const user = new userSchema({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        const role = await roleSchema.findOne({ name: user.role })
        role.users.push(user.id)
        user.roleId = role.id
        await role.save()
        await user.save()
        await sendVerificationEmail(user)
        res.send({ message: 'Registration successful, please check your email' })
    } catch (err) {
        res.status(500).send(err)
    }
}
const verifyEmail = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)
        const user = await userSchema.findByIdAndUpdate(
            decoded.userId,
            { emailVerified: true },
            { new: true }
        )
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        res.send({ message: 'Email verified successfully' })
    } catch (err) {
        res.status(400).send({ message: 'Invalid token' })
    }
}
const forgotpassword = async (req, res, next) => {
    const email = req.body.email
    let user
    try{
        user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: 'No account with that email address exists.' })
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    const token = generateToken()
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000
    try {
        await user.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    await sendForgotPasswordEmail(user)
    res.send({ message: 'A password reset email has been sent to the provided email.' })
}
const resetPasswordGet = async (req, res, next) => {
    userSchema.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Password reset token is invalid or has expired.' })
      }
      res.status(200).send({ message: 'Welcome ' + user.email + '. Please POST new password on same URL.' })
    })
}
const resetPasswordPost = async (req, res, next) => {
    const resetPasswordToken = req.params.token
    const { password } = req.body
    let user
    try {
        user = await userSchema.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } })
        if (!user) {
            return res.status(404).send({ message: 'Password reset token is invalid or has expired.' });
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    try {
        await user.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.send({ message: 'Password has been reseted successfully!' })
}
const getProfile = async (req, res, next) => {
    try {
        const user = await userSchema.findById(req.user.id)
        if (!user.emailVerified) {
            return res.status(401).send({ message: 'Email not verified' })
        }
        res.send({ message: 'Welcome to your profile', user })
    } catch (err) {
        res.status(500).send(err)
    }
}
const verifyAdmin = async (req, res, next) => {
    res.send({ message: 'Welcome to the admin area' })
}
const verifyProjectManager = async (req, res, next) => {
    res.send({ message: 'Welcome to the project manager area' })
}
const verifyUser = async (req, res, next) => {
    res.send({ message: 'Welcome to the user area' })
}
module.exports = { login, register, verifyEmail, forgotpassword, resetPasswordGet, resetPasswordPost, getProfile, verifyAdmin, verifyProjectManager, verifyUser }