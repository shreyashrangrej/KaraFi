require('dotenv').config();
require('./database/connection')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./authentication/routes/auth.routes')
const userRouter = require('./authentication/routes/user.routes')
const userDetailRoutes = require('./routes/userDetail.route')
const addressRoutes = require('./routes/address.route');
const projectRouter = require('./routes/project.route');

const projectImport = require('./import/project.import');

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/api', authRouter)

app.use('/api', userRouter)

app.use('/api', userDetailRoutes)

app.use('/api', addressRoutes)

app.use('/api', projectRouter)

app.use('/api', projectImport)

app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Not Found."
    })
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})