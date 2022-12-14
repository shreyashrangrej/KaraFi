const statusSchema = require('../models/status.model')
const getStatuses = async (req, res, next) => {
    return res.status(200).json({ message: 'get all status' })
}
const getStatusById = async (req, res, next) => {
    return res.status(200).json({ message: 'get status by id' })
}
const createStatus = async (req, res, next) => {
    return res.status(200).json({ message: 'create status' })
}
const updateStatus = async (req, res, next) => {
    return res.status(200).json({ message: 'update status' })
}
const deleteStatus = async (req, res, next) => {
    return res.status(200).json({ message: 'delete status' })
}
module.exports = { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus }