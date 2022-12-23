const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // Find the user with the given email
                const user = await User.findOne({ email });

                // If the user is not found, return a message
                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }

                // Check if the password is correct
                const isMatch = await user.comparePassword(password);

                // If the password is incorrect, return a message
                if (!isMatch) {
                    return done(null, false, { message: 'Password is incorrect' });
                }

                // If the email and password are correct, return the user object
                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
)
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