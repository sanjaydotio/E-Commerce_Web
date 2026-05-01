const express = require('express')

const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')

const {DATA_LIMIT} = require('../src/constants')

app.use(express.json({limit: DATA_LIMIT}))
app.use(express.static(path.join(__dirname , "public")))
app.use(express.urlencoded({extended: true , limit: DATA_LIMIT}))
app.use(cookieParser())

/**
 * Require Routes
 */
const userRoute = require('./routes/user.route')


/**
 * Use Routes
 */
app.use("/api/v1/users", userRoute)


module.exports = app