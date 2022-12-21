require('dotenv').config();
require('./database/connection')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Invaild Route or the Route does not exist."
    })
})
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})