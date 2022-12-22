const mongoose = require('mongoose')
const statusSeeder = require('../util/statusSeader')
const prioritySeeder = require('../util/prioritySeader')
let url = process.env.DATABASE_URL
mongoose.connect(url, {
}).then(() => {
    console.log('Database Connection Successful!')
    statusSeeder()
    prioritySeeder()
}).catch((e) => {
    console.log(`Database connection failed: ${e}`)
    process.exit()
})