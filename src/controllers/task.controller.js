const taskSchema = require('../models/task.model')

const getTasks = async (req, res, next) => {
    try {
        const task = await taskSchema.find()
        res.status(200).send({ tasks: task })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ Error: "Something went wrong, could not find users. Please check logs." });
    }
}

const getTaskById = async (req, res, next) => {
    const id = req.params.id
    let task
    try {
        task = await taskSchema.findOne({ taskId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find task: ' + id + ' .Please check logs.' })
        return next()
    }
    if(!task){
        return res.status(404).json({ Error: 'Could not find the task for provided ID: ' + id })
    }
    res.status(200).json({ task: task })
}

const createTask = async (req, res, next) => {
    const { taskId, taskTitle, taskDescription, startDate, dueDate, status, priority, project, taskCreator, taskOwner } = req.body
    const createTask = new taskSchema({
        taskId,
        taskTitle,
        taskDescription,
        startDate,
        dueDate,
        status,
        priority,
        project,
        taskCreator,
        taskOwner
    })
    try {
        await createTask.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ task: createTask });
}

const updateTask = async (req, res, next) => {
    const { taskId, taskTitle, taskDescription, startDate, dueDate, status, priority, project, taskCreator, taskOwner } = req.body
    const id = req.params.id

    let task
    try {
        task = await taskSchema.findOne({ taskId: id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: 'Could not find the task for provided ID: ' + id });
        return next()
    }

    task.taskId = taskId
    task.taskTitle = taskTitle
    task.taskDescription = taskDescription
    task.startDate = startDate
    task.dueDate = dueDate
    task.status = status
    task.priority = priority
    task.project = project
    task.taskCreator = taskCreator
    task.taskOwner = taskOwner

    try {
        await task.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Updating task failed, please try again or check logs." })
        return next()
    }
    res.status(200).json({ task: task })
}

const deleteTask = async (req, res, next) => {
    const id = req.params.id
    let task
    try {
        task = await taskSchema.findOne({ taskId: id })
    } catch (error) {
        res.status(404).json({Error: 'Cannot find task with provided ID: ' + id})
        return next()
    }
    try {
        await task.remove()
    } catch (error){
        console.log(error)
        res.status(500).json({ Error: 'Something went wrong. Could not delete task: ' + id })
        return next()
    }
    res.status(200).json({ deletedTask: task })
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}