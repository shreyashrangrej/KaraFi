const express = require('express')
const router = express.Router()
const { getProject, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/project.controller')
router.get('/project', getProject)
router.get('/project/:id', getProjectById)
router.post('/project', createProject)
router.patch('/project/:id', updateProject)
router.delete('/project/:id', deleteProject)
module.exports = router
