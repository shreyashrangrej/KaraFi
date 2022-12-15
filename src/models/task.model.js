const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
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
    numberOfSubTasks: {
        type: String
    },
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ],
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
taskSchema.set('timestamps', true)
const task = new mongoose.model('task', taskSchema)
module.exports = task