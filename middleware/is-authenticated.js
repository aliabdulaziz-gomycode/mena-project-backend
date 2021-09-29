function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).send('You are not logged in!')
    }

    next()
}

module.exports = isAuthenticated