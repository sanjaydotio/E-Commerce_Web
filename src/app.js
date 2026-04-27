const express = require('express')

const app = express()
const path = require('path')

const {DATA_LIMIT} = require('../src/constants')

app.use(express.json({limit: DATA_LIMIT}))
app.use(express.static(path.join(__dirname , "public")))
app.use(express.urlencoded({extended: true , limit: DATA_LIMIT}))


module.exports = app