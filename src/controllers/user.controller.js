const userModel = require('../models/user.model')
const ErrorApi  = require('../utils/ErrorApi')
const sendEmail = require('../middlewares/sendemail')
const ResponseApi = require('../utils/ResponseApi')
const tokenBlackListModel = require('../models/tokenBlackList.model')
// const Cloudinary = require('../utils/cloudinary')

const generateAccessAndRefreshToken = async (id) => {
    const user = await userModel.findById(id)
    const AccessToken = await user.generateAccessToken()
    const RefreshToken = await user.generateRefreshToken()

    user.refreshToken = RefreshToken
    await user.save({validateBeforeSave: false})

    return {AccessToken , RefreshToken}
}

const Register = async (req,res) => {
    const {fullName , email , password , } = req.body

    if (!fullName || !email || !password){
        throw new ErrorApi(400 , "All field are required")
    }

    const isEmailAlreadyExists = await userModel.findOne({
        email
    })

    if (isEmailAlreadyExists){
        throw new ErrorApi(401 , "Email is Already Exists")
    }

    // const imagepath = req.file ? req.file.path : null

    // if (!imagepath){
    //     throw new ErrorApi(400 , "Profile Picture is 'Required")
    // }

    // const response = await Cloudinary(imagepath)

    // if (!response){
    //     throw new ErrorApi(502 , "Image Upload issue try Again...")
    // }

    const otp = Math.floor(1000 + Math.random() * 9000)

    console.log("OTP",otp)

    sendEmail(email , "Email Verification mail" , otp)

    const user = await userModel.create({
        fullName,
        email,
        password,
        otpVerification: otp,
        // profilePicture: response?.url
    })

    res.status(201).json(new ResponseApi(201 , user , "User Created Successfully"))

}

const OtpVerification = async (req,res) => {
    const {email , otp} = req.body

    if (!email){
        throw new ErrorApi(400 , "Email is required")
    }

    const user = await userModel.findOne({
        email
    })

    if (!user){
        throw new ErrorApi(401 , "User not found")
    }

    if (user.otpVerification !== otp){
        throw new ErrorApi(401 , "OTP is Invalid, try Again later")
    }

    user.isVerified = true
    user.otpVerification = null
    await user.save()

    const {AccessToken , RefreshToken} = await generateAccessAndRefreshToken(user._id)


    res.status(200)
    .cookie("AccessToken",AccessToken)
    .cookie("RefreshToken",RefreshToken)
    .json(new ResponseApi(200 , {user , AccessToken} , "OTP Verifierd Successfully"))

}

const Login = async (req,res) => {
    const {email , password} = req.body

    const isUserExists = await userModel.findOne({
        email
    })

    if (!isUserExists){
        throw new ErrorApi(400 , "User not found")
    }

    const isPasswordValid = await isUserExists.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ErrorApi(400 , "Invalid Password")
    }

    const { AccessToken , RefreshToken } = await generateAccessAndRefreshToken(isUserExists._id)

    res.status(200)
    .cookie("AccessToken",AccessToken)
    .cookie("RefreshToken",RefreshToken)
    .json(new ResponseApi(200 , isUserExists , "User Login Successfully"))

}

const Logout = async (req,res) => {
    const token = req.token
    console.log(token)

    await tokenBlackListModel.create({token})

    res.status(200)
    .clearCookie("AccessToken")
    .json(new ResponseApi(200 , "User Logged out Successfully"))
}


module.exports = { Register , OtpVerification , Login , Logout}

