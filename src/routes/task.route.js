const express = require('express')
const router = express.Router()

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task.controller')

router.get('/tasks', getTasks)

router.get('/task/:id', getTaskById)

router.post('/task', createTask)

router.patch('/task/:id', updateTask)

router.delete('/task/:id', deleteTask)

module.exports = router