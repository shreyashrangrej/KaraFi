const { body } = require('express-validator')

const userLoginValidate = [
    body("username")
        .exists({ checkFalsy: true })
        .withMessage("username is Required.")
        .isString()
        .withMessage("username should be string."),

    body("password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "i")
        .withMessage("Minimum eight characters, at least one letter and one number"),
]

module.exports = userLoginValidate;