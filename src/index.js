require('dotenv').config();
require('./database/connection')

const express = require('express');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userDetail.route')
const addressRoutes = require('./routes/address.route')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.use('/api', addressRoutes);

app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Not Found."
    })
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})