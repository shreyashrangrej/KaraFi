const express = require('express')
const authRouter = express.Router()

const { verifySignUp } = require('../middlewares')
const { signup, login, getAllUsers } = require('../controllers/auth.controller')
const userSingupValidate = require('../validators/userSignup.validator')
const userLoginValidate = require('../validators/userLogin.validator')

authRouter.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.post(
    '/auth/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
        userSingupValidate
    ],
    signup
);

authRouter.post('/auth/login', userLoginValidate, login)

authRouter.get('/getAuthAll', getAllUsers)

module.exports = authRouter;