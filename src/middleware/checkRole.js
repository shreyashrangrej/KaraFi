const checkRole = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next()
    }
    return res.status(401).send({ message: 'Unauthorized' })
}
module.exports = { checkRole }