const express = require('express')
const router = express.Router()
router.use('/api', require('./userMaster.route'))
router.use('/api', require('./project.route'))
router.use('/api', require('./task.route'))
router.use('/api', require('./subtask.route'))
router.use('/api', require('./department.route'))
router.use('/api', require('./organization.route'))
router.use('/api', require('./status.route'))
router.use('/api', require('./priority.route'))
module.exports = router