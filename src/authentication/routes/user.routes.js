const express = require('express')
const userRouter = express.Router()

const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')

userRouter.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

userRouter.get("/test/all", controller.allAccess);
userRouter.get("/test/user", [authJwt.verifyToken], controller.userBoard);

userRouter.get(
    "/test/projectManager",
    [authJwt.verifyToken, authJwt.isProjectManager],
    controller.projectManager
);

userRouter.get(
    "/test/companyAdmin",
    [authJwt.verifyToken, authJwt.isCompanyAdmin],
    controller.companyAdminBoard
);

module.exports = userRouter;