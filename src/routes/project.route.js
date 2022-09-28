const express = require('express')
const projectRouter = express.Router()

const {getProject, getProjectById, createProject, updateProject, deleteProject} = require('../controllers/project.controller')

projectRouter.get('/projects', getProject)

projectRouter.get('/project/:id', getProjectById)

projectRouter.post('/project', createProject)

projectRouter.patch('/project/:id', updateProject)

projectRouter.delete('/project/:id', deleteProject)

module.exports = projectRouter
