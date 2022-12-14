const prioritySchema = require('../models/priority.model')
const getPriorities = async (req, res, next) => {
    return res.status(200).json({ message: 'get all priority' })
}
const getPriorityById = async (req, res, next) => {
    return res.status(200).json({ message: 'get priority by id' })
}
const createPriority = async (req, res, next) => {
    return res.status(200).json({ message: 'create priority' })
}
const updatePriority = async (req, res, next) => {
    return res.status(200).json({ message: 'update priority' })
}
const deletePriority = async (req, res, next) => {
    return res.status(200).json({ message: 'delete priority' })
}
module.exports = { getPriorities, getPriorityById, createPriority, updatePriority, deletePriority }