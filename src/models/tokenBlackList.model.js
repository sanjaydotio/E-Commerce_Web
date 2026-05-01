const mongoose = require('mongoose')


const tokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String
    }
})


const tokenBlackListModel = mongoose.model("tokenBlackList",tokenBlackListSchema)

module.exports = tokenBlackListModel