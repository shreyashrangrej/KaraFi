const userSchema = require('../models/user.model')
const sendVerificationEmail = require('../util/sendVerificationEmail')
const jwt = require('jsonwebtoken')
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
        // Update the user's emailVerified field
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
const checkAdmin = async (req, res, next) => {
    res.send({ message: 'Welcome to the admin area' })
}
module.exports = { login, register, verifyEmail, getProfile, checkAdmin }