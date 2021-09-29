const mongoose = require('mongoose')

// A function to open a connection between 
// express and mongoDB
const connection = {
    open: async function() {
        await mongoose.connect(process.env.MONGODB_URL)
    }
}

module.exports = connection