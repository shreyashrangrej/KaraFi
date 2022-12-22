const { validationResult } = require('express-validator')
const organizationSchema = require('../models/organization.model')
const getOrganizations = async (req, res, next) => {
    try {
        const organization = await organizationSchema.find()
        res.status(200).send({ organizations: organization })
    } catch (error) {
        return res.status(404).json({ Error: error.message })
    }
}
const getOrganizationsById = async (req, res, next) => {
    const id = req.params.id
    let organization
    try {
        organization = await organizationSchema.findOne({ organizationId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find organization: ' + id + ' .Please check logs.' })
        return next()
    }
    if (!organization) {
        return res.status(404).json({ Error: 'Could not find the organization for provided ID: ' + id })
    }
    res.status(200).json({ organization: organization })
}
const createOrganization = async (req, res, next) => {
    const { organizationId, organizationName, organizationDescription, country, state, district, zipCode, addressLine1, addressLine2, type, projects } = req.body
    const createOrganization = new organizationSchema({
        organizationId,
        organizationName,
        organizationDescription,
        country,
        state,
        district,
        zipCode,
        addressLine1,
        addressLine2,
        type,
        projects
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await createOrganization.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ organization: createOrganization })
}
const updateOrganization = async (req, res, next) => {
    const { organizationId, organizationName, organizationDescription, country, state, district, zipCode, addressLine1, addressLine2, type, projects } = req.body
    const id = req.params.id
    let organization
    try {
        organization = await organizationSchema.findOne({ organizationId: id })
    } catch (error) {
        res.status(500).json({ Error: 'Could not find the organization for provided ID: ' + id + error.message });
        return next()
    }
    organization.organizationId = organizationId
    organization.organizationName = organizationName
    organization.organizationDescription = organizationDescription
    organization.country = country
    organization.state = state
    organization.district = district
    organization.zipCode = zipCode
    organization.addressLine1 = addressLine1
    organization.addressLine2 = addressLine2
    organization.type = type
    organization.projects = projects
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await organization.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ organization: organization })
}
const deleteOrganization = async (req, res, next) => {
    const id = req.params.id
    let organization
    try {
        organization = await organizationSchema.findOne({ organizationId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Cannot find organization with provided ID: ' + id + error.message })
        return next()
    }
    try {
        await organization.remove()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ deletedOrganization: organization })
}
module.exports = { getOrganizations, getOrganizationsById, createOrganization, updateOrganization, deleteOrganization }