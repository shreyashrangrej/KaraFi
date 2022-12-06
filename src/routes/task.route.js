const express = require('express')
const taskRouter = express.Router()

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task.controller')

taskRouter.get('/tasks', getTasks)

taskRouter.get('/task/:id', getTaskById)

taskRouter.post('/task', createTask)

taskRouter.patch('/task/:id', updateTask)

taskRouter.delete('/task/:id', deleteTask)

module.exports = taskRouter