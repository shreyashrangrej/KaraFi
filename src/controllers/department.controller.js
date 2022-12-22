const { validationResult } = require('express-validator')
const departmentSchema = require('../models/department.model')
const getDepartments = async (req, res, next) => {
    try {
        const department = await departmentSchema.find()
        res.status(200).send({ departments: department })
    } catch (error) {
        return res.status(404).json({ Error: error.message })
    }
}
const getDepartmentById = async (req, res, next) => {
    const id = req.params.id
    let department
    try {
        department = await departmentSchema.findOne({ departmentId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Something went wrong, could not find department: ' + id + ' .Please check logs.' })
        return next()
    }
    if (!department) {
        return res.status(404).json({ Error: 'Could not find the department for provided ID: ' + id })
    }
    res.status(200).json({ department: department })
}
const createDepartment = async (req, res, next) => {
    const { departmentId, departmentName, departmentDescription, headOfDepartment, departmentMembers, departmentProjects } = req.body
    const createDepartment = new departmentSchema({
        departmentId,
        departmentName,
        departmentDescription,
        headOfDepartment,
        departmentMembers,
        departmentProjects
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await createDepartment.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ department: createDepartment })
}
const updateDepartment = async (req, res, next) => {
    const { departmentId, departmentName, departmentDescription, headOfDepartment, departmentMembers, departmentProjects } = req.body
    const id = req.params.id
    let department
    try {
        department = await departmentSchema.findOne({ departmentId: id })
    } catch (error) {
        res.status(500).json({ Error: 'Could not find the department for provided ID: ' + id + error.message });
        return next()
    }
    department.departmentId = departmentId
    department.departmentName = departmentName
    department.departmentDescription = departmentDescription
    department.headOfDepartment = headOfDepartment
    department.departmentMembers = departmentMembers
    department.departmentProjects = departmentProjects
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            })
        }
        await department.save()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ department: department })
}
const deleteDepartment = async (req, res, next) => {
    const id = req.params.id
    let department
    try {
        department = await departmentSchema.findOne({ departmentId: id })
    } catch (error) {
        res.status(404).json({ Error: 'Cannot find depatment with provided ID: ' + id + error.message })
        return next()
    }
    try {
        await department.remove()
    } catch (error) {
        res.status(500).json({ Error: error.message })
        return next()
    }
    res.status(200).json({ deletedDepartment: department })
}
module.exports = { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment }