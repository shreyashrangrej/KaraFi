const { body } = require("express-validator")
const fs = require('fs')
const path = require('path')
const nationalities = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../util/nationalities.json'), 'utf-8'))
const validator = [
    body('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is Required.")
        .isString()
        .withMessage("First Name should be string."),
    body("lastName")
        .exists({ checkFalsy: true })
        .withMessage("Last Name is Required.")
        .isString()
        .withMessage("Last Name should be string."),
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("Email is Required.")
        .isEmail()
        .withMessage("Provide valid email."),
    body("gender")
        .exists({ checkFalsy: true })
        .withMessage("Gender is Required.")
        .isString()
        .withMessage("Gender should be string.")
        .isIn(["male", "female", "other"])
        .withMessage("Gender value is invalid. Please enter male, female or other."),
    body("dateOfBirth")
        .exists({ checkFalsy: true })
        .withMessage("Date of birth is Required.")
        .isDate()
        .withMessage("Date of birth should be in yyyy-MM-dd format."),
    body("phoneNumber")
        .exists({ checkFalsy: true })
        .withMessage("Phone number is required.")
        .isString()
        .withMessage("Phone number should be string.")
        .isMobilePhone(),
    body('jobTitle')
        .isString()
        .withMessage("Job Title should be string."),
    body('nationality')
        .isString()
        .withMessage('Nationality should be string.')
        .isIn(nationalities)
        .withMessage('Nationality does not exist.'),
    body('birthPlace')
        .isString()
        .withMessage('Birth Place should be string.'),
]
module.exports = validator;