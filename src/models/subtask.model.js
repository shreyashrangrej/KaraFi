const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    subTaskId: {
        type: String,
        unique: true
    },
    subTaskTitle: {
        type: String
    },
    subTaskDescription: {
        type: String
    },
    startDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String
    },
    priority: {
        type: String
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    },
    subTaskCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermaster'
    },
    subTaskOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usermaster'
        }
    ]
})
Schema.set('timestamps', true)
const subtask = new mongoose.model('subtask', Schema)
module.exports = subtask
