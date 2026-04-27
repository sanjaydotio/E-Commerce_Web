const mongoose = require('mongoose')
const {DB_NAME} = require('../constants')

const ConnectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`)
        console.log(`Datbase Connected Successfully ${response.connection.host}`)
    } catch (error) {
        console.log(`Database Connection Failed ${error.message}`)
        process.exit(1)
    }
}


module.exports = ConnectDB