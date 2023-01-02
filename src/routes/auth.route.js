const express = require('express')
const router = express.Router()
const passport = require('../middleware/passport')
const { login, register, verifyEmail, getProfile, verifyAdmin, verifyProjectManager, verifyUser } = require('../controllers/auth.controller')
const { checkRole } = require('../middleware/checkRole')
router.post('/register', register)
router.post('/login', passport.authenticate('local', { session: false }), login)
router.get('/verify-email/:token', verifyEmail)
router.get('/profile', passport.authenticate('bearer', { session: false }), getProfile)
//Check Roles
router.get('/checkAdmin', passport.authenticate('bearer', { session: false }), checkRole(['admin']), verifyAdmin)
router.get('/checkProjectManager', passport.authenticate('bearer', { session: false }), checkRole(['projectManager']), verifyProjectManager)
router.get('/checkUser', passport.authenticate('bearer', { session: false }), checkRole(['user']), verifyUser)
module.exports = router