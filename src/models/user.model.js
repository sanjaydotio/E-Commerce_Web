const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        // required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user"
    },
    otpVerification:{
        type: Number,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }
})

userSchema.pre("save" , async function () {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password , 12)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign({
        _id: this._id,
        fullName: this.fullName,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET ,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET ,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

const userModel = mongoose.model("user", userSchema)


module.exports = userModel