const mongoose = require('mongoose')

// import passport-local-mongoose plugin
const passportLocalMongoose = require('passport-local-mongoose');

const schemaOptions = { timestamps: true } // add createdAt and updatedAt fields
const userSchema = mongoose.Schema({
    name: { type: String, required: true, maxLength: 32 },
    type: { type: String, enum: ['admin', 'customer'], required: true, default: 'customer'}
}, schemaOptions)

// add the plugin to the userSchema
const pluginOptions = { usernameField: 'email' } // default usernameFiled is username
userSchema.plugin(passportLocalMongoose, pluginOptions)

module.exports = mongoose.model('User', userSchema)

