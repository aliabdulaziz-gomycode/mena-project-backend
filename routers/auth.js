const express = require('express')
const router = express.Router()
const User = require('../models/user')
const PasswordRest = require('../models/password-reset')
const passport = require('passport')
const { checkSchema } = require('express-validator')
const registerSchema = require('../validation/schemas/register')
const passwordResetSchema = require('../validation/schemas/password-reset')
const newPasswordSchema = require('../validation/schemas/new-password')
const handleErrors = require('../validation/errors-handler')

router.put('/register', checkSchema(registerSchema), handleErrors, async (req, res) => {
    User.register(new User({ 
        name: req.body.name, 
        email : req.body.email 
    }), req.body.password, function(err, user) {
        if (err) {
            return res.status(500).send(err)
        }

        return res.send(user)
    })
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
    return res.send(req.user)
})

router.post('/logout', async (req, res) => {
    req.logout()
    res.send('logout')
})

router.put('/password-reset', checkSchema(passwordResetSchema), handleErrors, async (req, res) => {
    const token = require('crypto').randomBytes(32).toString('hex') // generate random string of 64 characters
    const user = await User.findOne({ email: req.body.email })
    await PasswordRest.findOneAndUpdate({ user: user._id }, {
        token: token }, {
        upsert: true // if document (record) is not existing create a new one
    })

    // send email with password reset link
    const transporter = require('../mail/transporter')
    const message = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: 'Password reset request',
        text: `Password reset url: http://localhost:3300/password-reset/${token}`,
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            return res.status(500).send(err);
        }
    })

    return res.send('email has been sent successfully')
})

router.patch('/new-password', checkSchema(newPasswordSchema), handleErrors, async (req, res) => {
    const passwordReset = await PasswordRest
        .findOne({ token: req.body.token })
        .populate('user')

    const user = passwordReset.user

    await passwordReset.remove()

    await user.setPassword(req.body.password)
    await user.save()

    return res.send('Password has been reset successfully')

})

module.exports = router