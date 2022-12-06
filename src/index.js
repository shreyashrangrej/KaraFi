require('dotenv').config();
require('./database/connection')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const userMasterRoutes = require('./routes/userMaster.route')
const addressRoutes = require('./routes/address.route')
const projectRouter = require('./routes/project.route')
const taskRouter = require('./routes/task.route')

const projectImport = require('./import/project.import');

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/api', userMasterRoutes)

app.use('/api', addressRoutes)

app.use('/api', projectRouter)

app.use('/api', projectImport)

app.use('/api', taskRouter)

app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: "Not Found."
    })
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})