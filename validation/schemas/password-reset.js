const User = require("../../models/user")

const schema = {
    email: {
        trim: true,
        isLength: {
            errorMessage: 'Email is required',
            options: { min: 1 }
        },
        isEmail: {
            errorMessage: 'Incorrect email'
        },
        custom: {
            options: (value) => {
                return User.findOne({ email: value }).then(user => {
                    if (!user) {
                        return Promise.reject('Email is not registered')
                    }
                })
            }
        }
    }
}

module.exports = schema