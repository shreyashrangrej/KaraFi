const userSchema = require('../models/user.model')
const sendVerificationEmail = require('../util/sendVerificationEmail')
const jwt = require('jsonwebtoken')
const login = async (req, res, next) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.send({ token })
}
const register = async (req, res, next) => {
    try {
        // Create a new user
        const user = new userSchema({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        // Save the user to the database
        await user.save();

        // Send the email verification link
        await sendVerificationEmail(user);

        // Return a success message
        res.send({ message: 'Registration successful, please check your email' });
    } catch (err) {
        res.status(500).send(err);
    }
}
const verifyEmail = async (req, res, next) => {
    try {
        // Verify the token
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        // Update the user's emailVerified field
        const user = await userSchema.findByIdAndUpdate(
            decoded.userId,
            { emailVerified: true },
            { new: true }
        );

        // If the user is not found, return an error message
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // If the user is found, return a success message
        res.send({ message: 'Email verified successfully' });
    } catch (err) {
        // If the token is invalid, return an error message
        res.status(400).send({ message: 'Invalid token' });
    }
}
const getProfile = async (req, res, next) => {
    try {
        const user = await userSchema.findById(req.user.id);
        // If the user's email is not verified, return an error message
        if (!user.emailVerified) {
            return res.status(401).send({ message: 'Email not verified' });
        }

        // If the user's email is verified, return the user's profile
        res.send({ message: 'Welcome to your profile', user });
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = { login, register, verifyEmail, getProfile }