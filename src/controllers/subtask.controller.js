const subTaskSchema = require('../models/subtask.model')
const getSubTasks = async (req, res, next) => {
    try {
        const subTask = await subTaskSchema.find()
        res.status(200).send({ subTasks: subTask })
    } catch (error) {
        res.status(404).json({ Error: error.message })
        return next()
    }
}
const getSubTaskById = async (req, res, next) => {
    const id = req.params.id
    let subTask
    try {
        subTask = await subTaskSchema.findOne({ taskId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find task: ' + id + error.message })
        return next()
    }
    if(!subTask){
        return res.status(404).json({ Error: 'Could not find the task for provided ID: ' + id })
    }
    res.status(200).json({ subTask: subTask })
}
const createSubTask = async (req, res, next) => {
    const { taskId, taskTitle, taskDescription, startDate, dueDate, status, priority, parentTask, project, taskCreator, taskOwner } = req.body
    const createSubTask = new subTaskSchema ({
        taskId,
        taskTitle,
        taskDescription,
        startDate,
        dueDate,
        status,
        priority,
        parentTask,
        project,
        taskCreator,
        taskOwner
    })
    try {
        await createSubTask.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ subTask: createSubTask })
}
const updateSubTask = async (req, res, next) => {
    const { taskId, taskTitle, taskDescription, startDate, dueDate, status, priority, parentTask, project, taskCreator, taskOwner } = req.body
    const id = req.params.id
    let subTask
    try {
        subTask = await subTaskSchema.findOne({ taskId: id })
    } catch (error) {
        res.status(500).json({ Error: 'Could not find the sub task for provided ID: ' + id + error.message })
        return next()
    }
    subTask.taskId = taskId
    subTask.taskTitle = taskTitle
    subTask.taskDescription = taskDescription
    subTask.startDate = startDate
    subTask.dueDate = dueDate
    subTask.status = status
    subTask.priority = priority
    subTask.parentTask = parentTask
    subTask.project = project
    subTask.taskCreator = taskCreator
    subTask.taskOwner = taskOwner
    try {
        await subTask.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ subTask: subTask })
}
const deleteSubTask = async (req, res, next) => {
    const id = req.params.id
    let subTask
    try {
        subTask = await subTaskSchema.findOne({ taskId: id })
    } catch (error) {
        res.status(404).json({Error: 'Cannot find sub task with provided ID: ' + id + error.message})
        return next()
    }
    try {
        await subTask.remove()
    } catch (error){
        res.status(500).json({ Error: 'Something went wrong. Could not delete sub task: ' + id + error.message})
        return next()
    }
    res.status(200).json({ deletedSubTask: subTask })
}
module.exports = {
    getSubTasks,
    getSubTaskById,
    createSubTask,
    updateSubTask,
    deleteSubTask
}