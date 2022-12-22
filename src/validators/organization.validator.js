const { body } = require('express-validator')
const fs = require('fs')
const path = require('path')
const counrties = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../util/counrties.json'), 'utf-8'))
const validator = [
    body('organizationId')
        .exists({ checkFalsy: true })
        .withMessage('organizationId is required.')
        .isString()
        .withMessage('organizationId should be string.'),
    body('organizationName')
        .exists({ checkFalsy: true })
        .withMessage('organizationName is required.')
        .isString()
        .withMessage('organizationName should be string.'),
    body('organizationDescription')
        .isString()
        .withMessage('organizationDescription should be string.'),
    body('country')
        .isString()
        .withMessage('country should be string.')
        .isIn(counrties)
        .withMessage('country does not exist.'),
    body('state')
        .isString()
        .withMessage('state should be string.'),
    body('district')
        .isString()
        .withMessage('district should be string.'),
    body('zipCode')
        .isString()
        .withMessage('zipCode should be string')
        .isLength({ min: 5 })
        .withMessage('zipCode must be minimum 5 digit long.'),
    body('addressLine1')
        .isString()
        .withMessage('addressLine1 should be string.'),
    body('addressLine2')
        .isString()
        .withMessage('addressLine2 should be string.'),
    body('type')
        .isString()
        .withMessage('type should be string.')
]
module.exports = validator