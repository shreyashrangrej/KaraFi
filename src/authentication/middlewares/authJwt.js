const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/user.model')
const Role = require('../models/role.model')

verifyToken = (req, res, next) => {
    let token = req.headers['authorization'].replace('Bearer ', '');
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

isCompanyAdmin = async (req, res, next) => {
    await User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].roleName === 'companyAdmin') {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: 'Require Company Admin Role!' });
                return;
            }
        );
    });
};

isProjectManager = async (req, res, next) => {
    await User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].roleName === 'projectManager' || roles[i].roleName === 'companyAdmin') {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: 'Require Project Manager Role!' });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isCompanyAdmin,
    isProjectManager
};
module.exports = authJwt;