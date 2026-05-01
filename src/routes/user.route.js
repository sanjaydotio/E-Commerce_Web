const express = require('express')

const route = express.Router()

/**
 * Require Controllers
 */

const userController = require('../controllers/user.controller')

/**
 * Require Middlewares
 */

const upload = require('../middlewares/multer.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

/**
 * Use Controllers
 */

route.post("/register", upload.single('profilePicture'), userController.Register)
route.post("/otpVerification", userController.OtpVerification)
route.post("/login", userController.Login)
route.get("/logout", authMiddleware.isLogin ,userController.Logout)



module.exports = route
