const { body } = require('express-validator')
const validator = [
    body('taskId')
        .exists({ checkFalsy: true })
        .withMessage('taskId is required.')
        .isString()
        .withMessage('projectId should be string.'),
    body('taskTitle')
        .exists({ checkFalsy: true })
        .withMessage('taskTitle is required.')
        .isString()
        .withMessage('projectTitle should be string.'),
    body('taskDescription')
        .isString()
        .withMessage('taskDescription should be string.'),
    body('startDate')
        .isDate()
        .withMessage('startDate should be in yyyy-MM-dd format.'),
    body('dueDate')
        .isDate()
        .withMessage('dueDate should be in yyyy-MM-dd format.'),
    body('status')
        .exists({ checkFalsy: true })
        .withMessage('status is required')
        .isString()
        .withMessage('status should be string.'),
    body('priority')
        .exists({ checkFalsy: true })
        .withMessage('priority is required.')
        .isString()
        .withMessage('priority should be of type string.')
]
module.exports = validator