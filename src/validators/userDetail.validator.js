const { body } = require("express-validator")

const userDetailModelValidate = [
    body("firstName")
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
        .isIn(["Male", "Female", "Other"])
        .withMessage("Gender value is invalid. Please enter Male, Female or Other."),

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
        .custom((value) => {
            if (value.length !== 10) {
                return Promise.reject("Phone number should be 10 digits");
            } else {
                return true;
            }
        }),
        
    body('jobTitle')
        .exists({ checkFalsy: true })
        .withMessage("Job Title is required")
        .isString()
        .withMessage("Job Title should be string."),

    body('nationality')
        .isString()
        .withMessage('Nationality should be string.'),

    body('birthPlace')
        .isString()
        .withMessage('Birth Place should be string.'),
];

module.exports = userDetailModelValidate;