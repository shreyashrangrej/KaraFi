const express = require('express')
const router = express.Router()
const { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus } = require('../controllers/status.controller')
router.get('/status', getStatuses)
router.get('/status/:id', getStatusById)
router.post('/status', createStatus)
router.patch('/status/:id', updateStatus)
router.delete('/status/:id', deleteStatus)
module.exports = router