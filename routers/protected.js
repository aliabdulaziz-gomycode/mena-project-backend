const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/is-authenticated')

router.use(isAuthenticated)

router.get('/profile', async (req, res) => {
    return res.send(req.user)
})

module.exports = router