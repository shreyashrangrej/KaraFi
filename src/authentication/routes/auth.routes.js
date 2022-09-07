const express = require('express')
const authRouter = express.Router()

const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth.controller')

authRouter.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);
authRouter.post("/auth/login", controller.login);

module.exports = authRouter;