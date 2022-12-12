const express = require('express')
const router = express.Router()
const { getOrganizations, getOrganizationsById, createOrganization, updateOrganization, deleteOrganization } = require('../controllers/organization.controller')
router.get('/organizations', getOrganizations)
router.get('/organization/:id', getOrganizationsById)
router.post('/organization', createOrganization)
router.patch('/organization/:id', updateOrganization)
router.delete('/organization/:id', deleteOrganization)
module.exports = router