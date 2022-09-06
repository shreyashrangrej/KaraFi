const mongoose = require('mongoose')

const roleModel = new mongoose.Schema({
    roleName: {
        type: String
    }
})

roleModel.set('timestamps', true)

const Role = new mongoose.model('role', roleModel)

module.exports = Role;