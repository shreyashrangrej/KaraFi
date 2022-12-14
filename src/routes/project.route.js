const express = require('express')
const router = express.Router()
const validator = require('../validators/project.validator')
const { getProject, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/project.controller')
router.get('/project', getProject)
router.get('/project/:id', getProjectById)
router.post('/project', validator, createProject)
router.patch('/project/:id', validator, updateProject)
router.delete('/project/:id', deleteProject)
module.exports = router
