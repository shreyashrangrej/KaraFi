const { validationResult } = require('express-validator')
const statusSchema = require('../models/status.model')
const getStatuses = async (req, res, next) => {
    try {
        const status = await statusSchema.find()
        res.status(200).send({ statuses: status })
    } catch (error) {
        return res.status(404).json({ Error: error.message })
    }
}
const getStatusById = async (req, res, next) => {
    const id = req.params.id
    let status
    try {
        status = await statusSchema.findOne({ statusId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find status: ' + id + ' .Please check logs.' })
        return next()
    }
    if (!status) {
        return res.status(404).json({ Error: 'Could not find the status for provided ID: ' + id })
    }
    res.status(200).json({ status: status })
}
const createStatus = async (req, res, next) => {
    const { statusId, statusName, statusDescription, projects, tasks, subTasks } = req.body
    const createStatus = new statusSchema({
        statusId,
        statusName,
        statusDescription,
        projects,
        tasks,
        subTasks
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await createStatus.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ status: createStatus })
}
const updateStatus = async (req, res, next) => {
    const { statusId, statusName, statusDescription, projects, tasks, subTasks } = req.body
    const id = req.params.id
    let status
    try {
        status = await statusSchema.findOne({ statusId: id })
    } catch (error) {
        res.status(500).json({ Error: 'Could not find the status for provided ID: ' + id + error.message })
        return next()
    }
    status.statusId = statusId
    status.statusName = statusName
    status.statusDescription = statusDescription
    status.projects = projects
    status.tasks = tasks
    status.subTasks = subTasks
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await status.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ status: status })
}
const deleteStatus = async (req, res, next) => {
    const id = req.params.id
    let status
    try {
        status = await statusSchema.findOne({ statusId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Cannot find status with provided ID: ' + id + error.message })
        return next()
    }
    try {
        await status.remove()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ deletedstatus: status })
}
module.exports = { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus }