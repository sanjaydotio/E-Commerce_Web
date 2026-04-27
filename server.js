require('dotenv').config()
const server = require('./src/app')
const ConnectDB = require('./src/db/db')


ConnectDB()
.then(() => {
    server.listen(process.env.PORT || 8080 , () => {
        console.log(`Server is running at port no ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`Database Connection failed in Server Side ${err.message}`)
})