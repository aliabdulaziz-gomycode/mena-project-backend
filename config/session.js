const expressSession = require('express-session')

function session() {
    return expressSession({
        secret: 'mysimplekey',
        resave: false,
        saveUninitialized: true
    })
}

module.exports = session