const organizationSchema = require('../models/organization.model')
const getOrganizations = async (req, res, next) => {
    return res.status(200).json({ Message: 'Get All Organizations' })
}
const getOrganizationsById = async (req, res, next) => {
    return res.status(200).json({ Message: 'Get organization by Id' })
}
const createOrganization = async (req, res, next) => {
    return res.status(200).json({ Message: 'Create Organizations' })
}
const updateOrganization = async (req, res, next) => {
    return res.status(200).json({ Message: 'Update Organizations' })
}
const deleteOrganization = async (req, res, next) => {
    return res.status(200).json({ Message: 'Delete Organizations' })
}
module.exports = { getOrganizations, getOrganizationsById, createOrganization, updateOrganization, deleteOrganization }