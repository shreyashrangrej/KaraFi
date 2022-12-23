const passport = require('passport')
const express = require('express')
const router = express.Router()
const { login, register, verifyEmail, getProfile } = require('../controllers/auth.controller')
const { checkAuth } = require('../middleware/checkAuth')
const { checkRole } = require('../middleware/checkRole')
router.get('/verify-email/:token', verifyEmail)
router.get('/admin', checkAuth, checkRole(['admin']), (req, res) => {
    res.send({ message: 'Welcome to the admin area' });
})
router.get('/profile', checkAuth, getProfile)
router.post('/login', passport.authenticate('local', { session: false }), login)
router.post('/register', register)
module.exports = router
