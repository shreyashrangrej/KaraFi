const { body } = require('express-validator')
const addressModelValidate = [
    body('addressLine1')
        .exists({ checkFalsy: true })
        .withMessage('Address Line 1 is required.')
        .isString()
        .withMessage('Address Line 1 should be string.'),
    body('addressLine2')
        .exists({ checkFalsy: true })
        .withMessage('Address Line 2 is required.')
        .isString()
        .withMessage('Address Line 2 should be string.'),
    body('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.')
        .isString()
        .withMessage('Country should be string.'),
    body('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required.')
        .isString()
        .withMessage('State should be string'),
    body('district')
        .exists({ checkFalsy: true })
        .withMessage('District is required')
        .isString()
        .withMessage('District should be string'),
    body('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.')
        .isString()
        .withMessage('City should be string.'),
    body('zipCode')
        .exists({ checkFalsy: true })
        .withMessage('Zip code is required.')
        .isString()
        .withMessage('Zip Code should be string.'),
    body('userMaster')
        .exists({ checkFalsy: true })
        .withMessage(' User is required.')
        .isString()
        .withMessage('User should be string.')
]
module.exports = addressModelValidate;