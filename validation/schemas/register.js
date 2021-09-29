const User = require('../../models/user')

const schema = {
    name: {
        trim: true,
        isLength: {
            errorMessage: 'Name field is required',
            options: { min: 1 }
        },
        isLength: {
            errorMessage: 'Name cannot be longer than 32 characters',
            options: { max: 32 }
        }
    },
    email: {
        trim: true,
        isLength: {
            errorMessage: 'Email field is required',
            options: { min: 1 }
        },
        isEmail: {
            errorMessage: 'Incorrect email'
        },
        custom: {
            options: (value) => {
                return User.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('Email is already registered')
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