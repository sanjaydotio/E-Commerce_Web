const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})


const sendEmail = async (to,subject,message) => {
    try {
        console.log("mailer OTP",message)
        const info = await transporter.sendMail({
            from: `"My App" <${process.env.SMTP_USER}>`, 
            to: to, 
            subject: subject,
            text: `Your OTP is: ${message}`,
        })
    } catch (error) {
        console.log("Error sending mail:", error.message)
    }
}

module.exports = sendEmail