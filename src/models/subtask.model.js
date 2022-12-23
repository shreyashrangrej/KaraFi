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
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status'
    },
    priority: {
        type: String
    },
    priorityId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'priorities'
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
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
