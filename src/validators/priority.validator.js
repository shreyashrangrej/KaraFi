const { body } = require('express-validator')
const validator = [
    body('priorityId')
        .exists({ checkFalsy: true })
        .withMessage('priorityId is required.')
        .isString()
        .withMessage('priorityId should be string.'),
    body('priorityName')
        .exists({ checkFalsy: true })
        .withMessage('priorityName is required.')
        .isString()
        .withMessage('priorityName should be string.'),
    body('priorityDescription')
        .isString()
        .withMessage('priorityDescription should be string.'),
]
module.exports = validator