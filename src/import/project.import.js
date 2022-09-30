const express = require('express')
const csv = require('csvtojson')
const upload = require('../middleware/upload')
const projectSchema = require('../models/project.model')
const projectImport = express.Router()

projectImport.post('/projectImport', upload.single('projects'), async (req, res, next) => {
    const file = req.file.path
    let projectsData

    try {
        await csv()
            .fromFile(file)
            .then(function (jsonArrayObj) {
                projectsData = jsonArrayObj
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Failed to read the file, please try again or check logs." })
        return next()
    }

    try {
        projectSchema.insertMany(projectsData)
            .then(function (data) {
                res.status(200).json({ projects: data })
            }).catch(function (error) {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Something went wrong, please try again or check logs." })
    }
})



module.exports = projectImport