const express = require('express')
const router = express.Router()
const validator = require('../validators/status.validator')
const { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus } = require('../controllers/status.controller')
router.get('/status', getStatuses)
router.get('/status/:id', getStatusById)
router.post('/status', validator, createStatus)
router.patch('/status/:id', validator, updateStatus)
router.delete('/status/:id', deleteStatus)
module.exports = router