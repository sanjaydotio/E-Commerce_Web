class ErrorApi extends Error {
    constructor(statusCode , message = "Something went wrong" , errors = []){
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors

        Error.captureStackTrace(this , this.constructor)
    }
}

module.exports = { ErrorApi }