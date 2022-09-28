const projectSchema = require('../models/project.model')

const getProject = async (req, res, next) => {
    return res.status(200).json({ Message: 'Get Projects' })
}

const getProjectById = async (req, res, next) => {
    return res.status(200).json({ Message: 'Get Projects by id' })
}

const createProject = async (req, res, next) => {
    return res.status(200).json({ Message: 'create Projects' })
}

const updateProject = async (req, res, next) => {
    return res.status(200).json({ Message: 'udpdate Projects' })
}

const deleteProject = async (req, res, next) => {
    return res.status(200).json({ Message: 'detele Projects' })
}

module.exports = {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}