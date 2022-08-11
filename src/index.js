require('dotenv').config();
require('./database/connection')

const express = require('express');
const userRoutes = require('./routes/user.route')
const addressRoutes = require('./routes/address.route')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to KaraFi!')
})

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