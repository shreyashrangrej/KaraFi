const { body } = require('express-validator')

const userSignupValidate = [
    body("username")
        .exists({ checkFalsy: true })
        .withMessage("username is Required.")
        .isString()
        .withMessage("username should be string."),

    body("email")
        .exists({ checkFalsy: true })
        .withMessage("email is Required.")
        .isEmail()
        .withMessage("Provide a valid email"),

    body("password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "i")
        .withMessage("Minimum eight characters, at least one letter and one number"),

    body("roles")
        .exists({ checkFalsy: true })
        .withMessage("Roles are required")
]

module.exports = userSignupValidate;