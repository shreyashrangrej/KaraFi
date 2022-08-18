require('dotenv').config();
require('./database/connection')

const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const userRoutes = require('./routes/userDetail.route')
const addressRoutes = require('./routes/address.route')
const authentication = require('./auth/auth')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authentication);

app.use('/api', requiresAuth(), userRoutes);

app.use('/api', requiresAuth(), addressRoutes);

app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Not Found."
    })
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})