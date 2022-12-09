const express = require('express')
const router = express.Router()
const { getSubTasks, getSubTaskById, createSubTask, updateSubTask, deleteSubTask } = require('../controllers/subtask.controller')
router.get('/subtasks', getSubTasks)
router.get('/subtask/:id', getSubTaskById)
router.post('/subtask', createSubTask)
router.patch('/subtask/:id', updateSubTask)
router.delete('/subtask/:id', deleteSubTask)
module.exports = router