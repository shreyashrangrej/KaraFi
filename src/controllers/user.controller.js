const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = require('../models/user.model')

const userSignup = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        let user = await userSchema.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new userSchema({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
            expiresIn: 10000
        },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await userSchema.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const userGet = async (req, res, next) => {
    try {
        const user = await userSchema.findById(req.user.id);
        res.json(user);
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }
};



module.exports = { userSignup, userLogin, userGet };