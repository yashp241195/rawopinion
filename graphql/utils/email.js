const nodemailer = require("nodemailer")
const { EMAIL_SENDER } = require('../../config')

const sendEmail = async (type, user) => {
    
    try{
        const APP_NAME = "rawopinion.in"
        
        const {email, emailToken, forgetPassToken, deleteDate} = user
        const APP_LINK = EMAIL_SENDER.APP_LINK

        const SENDER = {
            name:EMAIL_SENDER.SENDER_NAME, 
            email:EMAIL_SENDER.SENDER_EMAIL,
            contact_email:EMAIL_SENDER.SENDER_CONTACT_EMAIL
        }
        
        let transporter = nodemailer.createTransport({
            host:EMAIL_SENDER.APP_HOST,
            port:EMAIL_SENDER.APP_PORT,
            secure:false,
            auth:{
                user:EMAIL_SENDER.APP_EMAIL,
                pass:EMAIL_SENDER.APP_EMAIL_PWD
            }
        });
        
        if(!transporter){throw new Error("INVALID_SENDER_EMAIL_TRANSPORTER")}
        let emailBody = null
        
        switch(type){
            case "VERIFICATION_EMAIL": 
                const verifylink = APP_LINK+"/account/verify/email/"+emailToken
                emailBody = {
                    from:SENDER.email, to:email,
                    subject:`${APP_NAME} - Email Verification Link for ${email} `,
                    html:`
                    <p>Dear ${email},</p>
                    <p>Thank you for signing up for our service! To complete your 
                    registration and verify your email address, please click on the 
                    following link:</p>
                    <a href=${verifylink}>${verifylink}</a>
                    <p>If you cannot click on the link, please copy and paste it into your 
                    browser's address bar. Please note that the verification link will expire 
                    in 12 hours, so please make sure to complete the verification process as 
                    soon as possible.</p>
                    <p>If you did not sign up for our service, please disregard this email.</p>
                    <p>Thank you for your cooperation.</p>
                    <p>Best regards,
                    <br>${SENDER.name}
                    <br>${APP_NAME}
                    </p>
                    `
                };
                break;
            case "FORGOT_PASSWORD":
                const forgotpasswordlink = APP_LINK+"/account/password/reset/"+forgetPassToken
                emailBody = {
                    from:SENDER.email,
                    to:email,
                    subject:`${APP_NAME} - Password Reset Link for ${email} `,
                    html:`
                    <p>Dear ${email},</p>
                    <p>We have received a request to reset the password for your account. 
                    To reset your password, please click on the following link:</p>
                    <a href=${forgotpasswordlink}>${forgotpasswordlink}</a>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <p>Please note that the password reset link will expire in 1 hour for security reasons, 
                    so please reset your password as soon as possible. If you have any difficulty resetting 
                    your password, please don't hesitate to contact us at ${SENDER.contact_email}.</p>
                    <p>Thank you for using our service.</p>
                    <p>Best regards,<br>${SENDER.name}<br>${APP_NAME}</p>
                    `
                }
                break;
            case "SCHEDULE_DELETE": 
                emailBody = {
                    from:SENDER.email, to:email,
                    subject:`${APP_NAME} - Account Deletion Link for ${email} `,
                    html:`
                    <p>Dear ${email},</p>
                    <p>As per your request, your account is scheduled for deletion on ${deleteDate}. 
                    If you did not initiate this request, please contact our support team immediately at 
                    ${SENDER.contact_email} to prevent any unauthorized action.</p>
                    <p>Please note that once your account is deleted, all your data and settings will be 
                    permanently removed, and you will no longer have access to ${APP_NAME}.
                    If you have any questions or concerns, please feel free to reach out to our support team. 
                    We're here to assist you.</p>
                    <p>Thank you for being a part of ${APP_NAME}. We appreciate your understanding.</p>
                    <p>Best regards,<br>${SENDER.name}<br>${APP_NAME}</p>
                    `
                };
                break;
            default: 
                // don't send email
                return;
        }
    
        let info = await transporter.sendMail(emailBody)
        if(!info){throw new Error('EMAIL_'+type+'_NOT_SENT')}
        return info.messageId

    }
    catch(e){
        throw new Error(e.message)
    }
}


module.exports = { sendEmail }