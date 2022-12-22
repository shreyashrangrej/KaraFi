const { body } = require('express-validator')
const validator = [
    body('subTaskId')
        .exists({ checkFalsy: true })
        .withMessage('subTaskId is required.')
        .isString()
        .withMessage('subTaskId should be string.'),
    body('subTaskTitle')
        .exists({ checkFalsy: true })
        .withMessage('subTaskTitle is required.')
        .isString()
        .withMessage('subTaskTitle should be string.'),
    body('subTaskDescription')
        .isString()
        .withMessage('subTaskDescription should be string.'),
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