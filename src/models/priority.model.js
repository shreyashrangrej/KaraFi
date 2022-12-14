const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    priorityId: {
        type: String,
        unique: true
    },
    priorityName: {
        type: String
    },
    priorityDescription: {
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
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ]
})
Schema.set('timestamps', true)
const priority = new mongoose.model('priority', Schema)
module.exports = priority