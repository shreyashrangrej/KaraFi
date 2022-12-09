const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    taskTitle: {
        type: String
    },
    taskDescription: {
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
    taskCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermaster'
    },
    taskOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usermaster'
        }
    ]
})
Schema.set('timestamps', true)
const subtask = new mongoose.model('subtask', Schema)
module.exports = subtask
