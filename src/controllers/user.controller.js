const getUser = (req, res, next) => {
    res.json({message: "GET all Users"});
};

const getUserById = (req, res, next) => {
    res.json({message: "Get user by id"});
};

const createUser = (req, res, next) => {
    res.json({message: "DELETE all tea"});
};

const updateUser = (req, res, next) => {
    res.json({message: "GET 1 tea"});
};

const deleteUser = (req, res, next) => {
    res.json({message: "POST 1 tea comment"});
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};