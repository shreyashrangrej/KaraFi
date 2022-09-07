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
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
);

userRouter.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);

module.exports = userRouter;