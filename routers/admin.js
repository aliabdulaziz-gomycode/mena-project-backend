const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/is-authenticated')

router.use(isAuthenticated)
// router.use(isAdmin)

//localhost/admin
router.get('/', (req, res) => {
    // admin dashboard
})

//localhost/admin/users
router.get('/users', (req, res) => {
    // users index
})

module.exports = router