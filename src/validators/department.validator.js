const { body } = require('express-validator')
const validator = [
    body('departmentId')
        .exists({ checkFalsy: true })
        .withMessage('departmentId is required.')
        .isString()
        .withMessage('departmentId should be string.'),
    body('departmentName')
        .exists({ checkFalsy: true })
        .withMessage('departmentName is required.')
        .isString()
        .withMessage('departmentName should be string.'),
    body('departmentDescription')
        .isString()
        .withMessage('departmentDescription should be string.'),
]
module.exports = validator