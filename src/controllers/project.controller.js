const projectSchema = require('../models/project.model')
const userSchema = require('../models/userMaster.model')
const getProject = async (req, res, next) => {
    try {
        const project = await projectSchema.find()
        res.status(200).send({ projects: project })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ Error: "Something went wrong, could not find users. Please check Logs." })
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
    const { projectId, projectTitle, projectDescription, startDate, dueDate, status, priority, numberOfTasks, projectCreator, projectOwner } = req.body
    const createdProject = new projectSchema({
        projectId,
        projectTitle,
        projectDescription,
        startDate,
        dueDate,
        status,
        priority,
        numberOfTasks,
        projectCreator,
        projectOwner
    })
    try {
        const findCreator = await userSchema.findById(projectCreator)
        if (!findCreator) {
            return res.status(404).json({ error: 'Could not find Project Creator for provided user ID: ' + userMaster })
        }
        findCreator.createdProject.push(createdProject.id)
        let findOwner
        for (let i = 0; i < projectOwner.length; i++) {
            findOwner = await userSchema.findById(projectOwner[i])
            if (!findOwner) {
                return res.status(404).json({ error: 'Could not find Project Owner For provided user ID: ' + projectOwner[i] })
            }
            findOwner.ownerOfProject.push(createdProject.id)
        }
        await findOwner.save()
        await findCreator.save()
        await createdProject.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong please try again or check logs.' })
        return next()
    }
    res.status(200).json({ project: createdProject })
}
const updateProject = async (req, res, next) => {
    const { projectId, projectTitle, projectDescription, startDate, dueDate, status, priority, numberOfTasks, projectCreator, projectOwner } = req.body
    const pId = req.params.id
    let project;
    try {
        project = await projectSchema.findById(pId)
    } catch (error) {
        console.log(error)
        res.status(404).json({ Error: 'Could not find the project for provided ID: ' + pId })
        return next();
    }
    project.projectId = projectId
    project.projectTitle = projectTitle
    project.projectDescription = projectDescription
    project.startDate = startDate
    project.dueDate = dueDate
    project.status = status
    project.priority = priority
    project.numberOfTasks = numberOfTasks
    project.projectCreator = projectCreator
    project.projectOwner = projectOwner
    try {
        await project.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: 'Updating project failed, please try again or check logs.' })
        return next();
    }
    res.status(200).json({ project: project })
}
const deleteProject = async (req, res, next) => {
    const projectId = req.params.id
    let project
    try {
        project = await projectSchema.findById(projectId)
    } catch (err) {
        res.status(404).json({ error: 'Cannot find project with provided Id:' + projectId })
        return next();
    }
    try {
        await project.remove();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong, could not delete project:' + userId })
        return next();
    }
    res.status(200).json({ deletedProject: project })
}
module.exports = {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}