const taskSchema = require('../models/task.model')

const getTasks = async (req, res, next) => {
    return res.status(200).json({ Message: "Get Tasks" });
}

const getTaskById = async (req, res, next) => {
    return res.status(200).json({ Message: "Get Task by Id" });
}

const createTask = async (req, res, next) => {
    return res.status(200).json({ Message: "Create Task" });
}

const updateTask = async (req, res, next) => {
    return res.status(200).json({ Message: "Update Task" });
}

const deleteTask = async (req, res, next) => {
    return res.status(200).json({ Message: "delete Task" });
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}