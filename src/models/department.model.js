const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    departmentId: {
        type: String,
        unique: true
    },
    departmentName: {
        type: String,
    },
    departmentDescription: {
        type: String
    },
    headOfDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermaster'
    },
    departmentMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usermaster'
        }
    ],
    departmentProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }
    ],
})
schema.set('timestamps', true)
const department = new mongoose.model('department', schema)
module.exports = department
