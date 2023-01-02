const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('../models/user.model')
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done(null, false, { message: 'Email not found' })
                }
                const isMatch = await user.comparePassword(password)
                if (!isMatch) {
                    return done(null, false, { message: 'Password is incorrect' })
                }
                return done(null, user)
            } catch (err) {
                done(err)
            }
        }
    )
)
passport.use(new BearerStrategy(
    async (token, done) => {
        User.findOne({ token: token }, function (err, user) {
            if (err) { 
                return done(err); 
            }
            if (!user) { 
                return done(null, false)
            }
            return done(null, user, { scope: 'all' })
        })
    }
))
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
})
module.exports = passport