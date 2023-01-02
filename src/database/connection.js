const mongoose = require('mongoose')
const roleSeeder = require('../util/roleSeader')
const statusSeeder = require('../util/statusSeader')
const prioritySeeder = require('../util/prioritySeader')
let url = process.env.DATABASE_URL
mongoose.connect(url, {
}).then(() => {
    console.log('Database Connection Successful!')
    statusSeeder()
    prioritySeeder()
    roleSeeder()
}).catch((e) => {
    console.log(`Database connection failed: ${e}`)
    process.exit()
})