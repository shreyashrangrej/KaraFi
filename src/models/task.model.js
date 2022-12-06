const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String
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