const PasswordRest = require('../../models/password-reset')

const schema = {
    token: {
        errorMessage: 'Invalid request. Please create a new password reset request.',
        isLength: { min: 1 },
        custom: {
            options: (value) => {
                return PasswordRest.findOne({ token: value }).then(token => {
                    if (!token) {
                        return Promise.reject('Invalid token')
                    }
                })
            }
        }
    },
    password: {
        isLength: {
            errorMessage: 'Password field is required',
            options: { min: 1 }
        },
        isStrongPassword: {
            errorMessage: 'Weak password'
        }
    },
    confirmation: {
        isLength: {
            errorMessage: 'Password confirmation field is required',
            options: { min: 1 }
        },
        custom: {
            errorMessage: 'Password confirmation does not match password',
            options: (value, { req }) => {
                return value === req.body.password
            }
        }
    }
}

module.exports = schema