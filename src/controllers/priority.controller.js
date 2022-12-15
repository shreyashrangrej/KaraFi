const prioritySchema = require('../models/priority.model')
const getPriorities = async (req, res, next) => {
    try {
        const priority = await prioritySchema.find()
        res.status(200).send({ priorities: priority })
    } catch (error) {
        return res.status(404).json({ Error: error.message })
    }
}
const getPriorityById = async (req, res, next) => {
    const id = req.params.id
    let priority
    try {
        priority = await prioritySchema.findOne({ priorityId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find priority: ' + id + ' .Please check logs.' })
        return next()
    }
    if (!priority) {
        return res.status(404).json({ Error: 'Could not find the priority for provided ID: ' + id })
    }
    res.status(200).json({ priority: priority })
}
const createPriority = async (req, res, next) => {
    const { priorityId, priorityName, priorityDescription, projects, tasks, subtasks } = req.body
    const createPriority = new prioritySchema({
        priorityId,
        priorityName,
        priorityDescription,
        projects,
        tasks,
        subtasks
    })
    try {
        await createPriority.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ priority: createPriority })
}
const updatePriority = async (req, res, next) => {
    const { priorityId, priorityName, priorityDescription, projects, tasks, subtasks } = req.body
    const id = req.params.id
    let priority
    try {
        priority = await prioritySchema.findOne({ priorityId: id })
    } catch (error) {
        res.status(500).json({ Error: 'Could not find the priority for provided ID: ' + id + error.message })
        return next()
    }
    priority.priorityId = priorityId
    priority.priorityName = priorityName
    priority.priorityDescription = priorityDescription
    priority.projects = projects
    priority.tasks = tasks
    priority.subtasks = subtasks
    try {
        await priority.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ priority: priority })
}
const deletePriority = async (req, res, next) => {
    const id = req.params.id
    let priority
    try {
        priority = await prioritySchema.findOne({ priorityId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Cannot find status with provided ID: ' + id + error.message })
        return next()
    }
    try {
        await priority.remove()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ deletedPriority: priority })
}
module.exports = { getPriorities, getPriorityById, createPriority, updatePriority, deletePriority }