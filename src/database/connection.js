const mongoose = require('mongoose')
let url = process.env.DATABASE_URL
mongoose.connect(url, {
}).then(() => {
    console.log('Database Connection Successful!')
}).catch((e) => {
    console.log(`Database connection failed: ${e}`)
    process.exit()
})