// Get access to .env file values
// To access the values use: process.env.<name-of-variable>
require('dotenv').config()

// Connect to mongodb
const connection = require('./config/connection')
connection.open().catch(err => console.log(err))

// Import express, and instantiate the app
const express = require('express')
const app = express()

// Add body parser middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// Passport Middleware
const session = require('./config/session')
const passport = require('passport')
app.use(session()) // this is express session
app.use(passport.initialize())
app.use(passport.session())

// Passport local mongoose (passport-local-mongoose)
const User = require('./models/user')
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// routers
app.use('/', require('./routers/public'))
app.use('/', require('./routers/auth'))
app.use('/', require('./routers/protected'))
app.use('/admin', require('./routers/admin'))

// Server Listen
app.listen(process.env.PORT)