require('dotenv').config();
require('./database/connection')

const express = require('express');
const userRoutes = require('./routes/user.route')

const app = express();
const port = process.env.PORT || 3000 ;

app.use(express.json());

app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Server Started at ${3000}`)
})