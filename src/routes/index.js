const express = require('express')
const router = express.Router()
router.use('/api', require('./userMaster.route'))
router.use('/api', require('./address.route'))
router.use('/api', require('./project.route'))
router.use('/api', require('./task.route'))
router.use('/api', require('./subtask.route'))
module.exports = router