const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordResetSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // expires: time in seconds
})

module.exports = mongoose.model('PasswordReset', passwordResetSchema)