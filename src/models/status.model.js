const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    statusId: {
        type: String,
        unique: true
    },
    statusName: {
        type: String
    },
    statusDescription: {
        type: String
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    subTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ]
})
Schema.set('timestamps', true)
const status = new mongoose.model('status', Schema)
module.exports = status