const express = require('express')
const router = express.Router()
const { getPriorities, getPriorityById, createPriority, updatePriority, deletePriority } = require('../controllers/priority.controller')
router.get('/priorities', getPriorities)
router.get('/priority/:id', getPriorityById)
router.post('/priority', createPriority)
router.patch('/priority/:id', updatePriority)
router.delete('/priority/:id', deletePriority)
module.exports = router