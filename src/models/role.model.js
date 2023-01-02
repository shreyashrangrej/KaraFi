const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})
Schema.set('timestamps', true)
const role = new mongoose.model('role', Schema)
module.exports = role