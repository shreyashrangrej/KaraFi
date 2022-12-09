const subTaskSchema = require('../models/subtask.model')

const getSubTasks = async (req, res, next) => {
    return res.status(200).json({ Messgae: 'Get Sub tasks' })
}
const getSubTaskById = async (req, res, next) => {
    return res.status(200).json({ Messgae: 'Get Sub task by Id' })
}
const createSubTask = async (req, res, next) => {
    return res.status(200).json({ Message: 'Create Task' })
}
const updateSubTask = async (req, res, next) => {
    return res.status(200).json({ Messgae: 'Update Task' })
}
const deleteSubTask = async (req, res, next) => {
    return res.status(200).json({ Messgae: 'Delete Task' })
}
module.exports = {
    getSubTasks,
    getSubTaskById,
    createSubTask,
    updateSubTask,
    deleteSubTask
}