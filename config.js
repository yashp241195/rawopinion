require("dotenv").config()

const LOCALMONGOURI = 'mongodb://127.0.0.1/opinion-db'
const MONGOPASSWORD = process.env.MONGOPASSWORD
const MONGOURI = 'mongodb+srv://alpha2244:'+MONGOPASSWORD+'@cluster0.trsdg.mongodb.net/opinion-db'
const EMAIL_SENDER = {
    APP_LINK: "https://rawopinion.in",
    APP_EMAIL: process.env.APP_EMAIL,
    APP_EMAIL_PWD: process.env.APP_EMAIL_PWD,
    APP_HOST:"smtp-relay.brevo.com",
    APP_PORT:587,
    SENDER_NAME:"Admin RawOpinion",
    SENDER_EMAIL:"no-reply@rawopinion.in",
    SENDER_CONTACT_EMAIL:"admin@rawopinion.in"
}

const AUTH_HASH = {
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    JWT_FORGOT_PASS_TOKEN: process.env.JWT_FORGOT_PASS_TOKEN,
    JWT_EMAIL_TOKEN: process.env.JWT_EMAIL_TOKEN,
    CONSTANT_USERNAME_SALT:"mysalt"
}


module.exports = {
    LOCALMONGOURI, MONGOURI,
    EMAIL_SENDER, AUTH_HASH
}