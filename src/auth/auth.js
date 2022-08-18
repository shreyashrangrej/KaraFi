const { auth, requiresAuth } = require('express-openid-connect')

const express = require('express')

const app = express()

const authConfig = {
    authRequired: process.env.AUTH_REQUIRED,
    auth0Logout: process.env.AUTH0_LOGOUT,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
}

app.use(auth(authConfig));

app.get('/', (req, res, next) => {
    res.send(req.oidc.isAuthenticated() ? 'Welcome to KaraFi You are Logged in' : 'Welcome to KaraFi You are currently Logged out')
})

app.get('/api/me', requiresAuth(), (req, res, next) => {
    res.send(JSON.stringify(req.oidc.user))
})

module.exports = app;