const express = require('express')
const router = express.Router()
const { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller')
router.get('/departments', getDepartments)
router.get('/department/:id', getDepartmentById)
router.post('/department', createDepartment)
router.patch('/department/:id', updateDepartment)
router.delete('/department/:id', deleteDepartment)
module.exports = router