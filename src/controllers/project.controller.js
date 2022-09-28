const projectSchema = require('../models/project.model')

const getProject = async (req, res, next) => {
    try {
        const project = await projectSchema.find()
        res.status(200).send({ projects: project })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ Error: "Something went wrong, could not find users. Please check Logs." });
    }
}

const getProjectById = async (req, res, next) => {
    const projectId = req.params.id
    let project
    try {
        project = await projectSchema.findById(projectId)
    } catch (error) {
        res.status(404).json({ Error: "Something went wrong, could not find project: " + projectId });
        return next();
    }
    if (!project) {
        return res.status(404).json({ Error: "Could not find the project for provided ID: " + projectId });
    }
    res.json({ project: project });
}

const createProject = async (req, res, next) => {
    const { projectTitle, projectDescription, startDate, endDate } = req.body
    const createdProject = new projectSchema({
        projectTitle,
        projectDescription,
        startDate,
        endDate
    })

    try {
        await createdProject.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong please try again or check logs.' })
        return next()
    }
    res.status(200).json({ project: createdProject })
}

const updateProject = async (req, res, next) => {
    const { projectTitle, projectDescription, startDate, endDate } = req.body
    const projectId = req.params.id

    let project;
    try {
        project = await projectSchema.findById(projectId)
    } catch (error) {
        console.log(error)
        res.status(404).json({ Error: 'Could not find the project for provided ID: ' + project })
        return next();
    }

    project.projectTitle = projectTitle
    project.projectDescription = projectDescription
    project.startDate = startDate
    project.endDate = endDate

    try {
        await project.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Updating User failed, please try again or check logs." });
        return next();
    }
    res.status(200).json({ project: project });
}

const deleteProject = async (req, res, next) => {
    return res.status(200).json({ Message: 'detele Projects' })
}

module.exports = {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}