const { body } = require('express-validator')
const validator = [
    body('statusId')
        .exists({ checkFalsy: true })
        .withMessage('statusId is required.')
        .isString()
        .withMessage('statusId should be string.'),
    body('statusName')
        .exists({ checkFalsy: true })
        .withMessage('statusName is required.')
        .isString()
        .withMessage('statusName should be string.'),
    body('statusDescription')
        .isString()
        .withMessage('statusDescription should be string.'),
]
module.exports = validator