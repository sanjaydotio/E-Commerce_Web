const tokenBlackListModel = require("../models/tokenBlackList.model")
const ErrorApi = require("../utils/ErrorApi")
const jwt = require('jsonwebtoken')

const isLogin = async (req,res,next) => {
    try {
        const AccessToken = req.cookies.AccessToken
    
        if (!AccessToken){
            throw new ErrorApi(400, "Token not provided")
        }

        const blackListed = await tokenBlackListModel.findOne({token: AccessToken})

        if (blackListed){
            throw new ErrorApi(401, "Token is Invalid")
        }
    
        const decoded = jwt.verify(AccessToken , process.env.ACCESS_TOKEN_SECRET)
        
        req.user = decoded
        req.token = AccessToken
        next()
    } catch (error) {
        console.log(`Token Verification failed ${error.message}`)
        throw new ErrorApi(401 , error.message)
    }

}


module.exports = {isLogin}