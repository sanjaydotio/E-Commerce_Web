const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadImage = async (imagepath) => {
    try {
        if (!imagepath) return null

        const response = await cloudinary.v2.uploader.upload(imagepath , {
            resource_type: "auto"
        })
        fs.unlinkSync(imagepath)
        return response
    } catch (error) {
        fs.unlinkSync(imagepath)
        return null
    }
}


module.exports =  uploadImage 