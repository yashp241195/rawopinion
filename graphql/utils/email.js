require('dotenv').config();

const getEmailBody = async (type, user) => {
    
    const APP_NAME = "Rawopinion.in"
    const { email, emailToken, forgetPassToken, deleteDate } = user
    const APP_LINK = "https://rawopinion.csoc.in"

    const SENDER = {
        name:"admin", email:"no-reply.rawopinion@csoc.in",
        contact_email:"admin@csoc.in"
    }
    
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
            return;
    }

    return emailBody
        
}

const transporter = {
    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.APP_EMAIL,
        pass:process.env.APP_EMAIL_PWD
    }
}


module.exports = { transporter, getEmailBody,  }
