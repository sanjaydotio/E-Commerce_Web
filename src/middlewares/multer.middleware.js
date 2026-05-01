const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null , './public/images')
    },
    filename: (req,file,cb) => {
        const unique = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null , file.fieldname + '_' + unique)
    }
})

const upload = multer({storage})

module.exports = upload