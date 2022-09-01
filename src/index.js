require('dotenv').config();
require('./database/connection')

const express = require('express');
const bodyParser = require('body-parser')

const userDetailRoutes = require('./routes/userDetail.route')
const addressRoutes = require('./routes/address.route')
const userRouter = require('./routes/user.route')

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(bodyParser.json())

app.use('/api', userDetailRoutes)

app.use('/api', addressRoutes)

app.use('/api', userRouter)

app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Not Found."
    })
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})