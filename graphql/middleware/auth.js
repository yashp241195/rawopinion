const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const AUTH_HASH = {
    
    // JWT_ACCESS_TOKEN: crypto.randomBytes(16).toString('hex'),
    // JWT_REFRESH_TOKEN: crypto.randomBytes(16).toString('hex'),
    // JWT_FORGOT_PASS_TOKEN:  crypto.randomBytes(16).toString('hex'),
    // JWT_EMAIL_TOKEN:  crypto.randomBytes(16).toString('hex'),
    
    JWT_ACCESS_TOKEN: "AAA", 
    JWT_REFRESH_TOKEN: "AAA", 
    JWT_FORGOT_PASS_TOKEN: "AAA", 
    JWT_EMAIL_TOKEN: "AAA" 

}


const auth = {

    signToken:(type, { _id, username }, res) => {
        try {
            let signedToken = null
            switch (type) {
              case "ACCESS_TOKEN":
                signedToken = jwt.sign({ _id, username }, AUTH_HASH.JWT_ACCESS_TOKEN, 
                    { expiresIn: 60*60*12 }
                );
                break; 
             case "REFRESH_TOKEN":
                signedToken = jwt.sign({ _id, username }, AUTH_HASH.JWT_REFRESH_TOKEN, 
                    { expiresIn: 60*60*24*180 }
                );
                res.cookie("refreshToken", signedToken, { httpOnly: true, secure: true, maxAge: 60*60*24*180*1000});
                break;
              case "FORGOT_PASS_TOKEN":
                const ft = jwt.sign({ _id, }, AUTH_HASH.JWT_FORGOT_PASS_TOKEN, { expiresIn: 60*60*1 });
                forgotPasswordToken = ft.replace(/\./g, '$');
                signedToken = forgotPasswordToken
                break;
              case "EMAIL_TOKEN":
                const et = jwt.sign({ _id, }, AUTH_HASH.JWT_EMAIL_TOKEN, { expiresIn: 60*60*12 });
                const emailToken = et.replace(/\./g, '$');
                signedToken = emailToken
                break;
            default:
                break;
            }
            if(signedToken == null){ throw new Error('INVALID_TOKEN_TYPE'); }
            return signedToken
        } catch (e) {
            console.log("SIGN_"+type+"_FAILED",e.message)
           throw new Error("SIGN_"+type+"_FAILED")
        }

    },
    verifyToken:(type, token, req)=>{
        try{

            let verifiedToken = null

            switch (type) {
                case "ACCESS_TOKEN_BEARER":
                    const cleanToken = req.headers['authorization'].replace("Bearer ", "");
                    verifiedToken = jwt.verify(cleanToken, AUTH_HASH.JWT_ACCESS_TOKEN);
                    break;
                case "ACCESS_TOKEN":
                    verifiedToken = jwt.verify(req.headers['authorization'], AUTH_HASH.JWT_ACCESS_TOKEN);
                    break;
                case "REFRESH_TOKEN":
                    verifiedToken = jwt.verify(req.cookies.refreshToken, AUTH_HASH.JWT_REFRESH_TOKEN);
                    break;
                case "FORGOT_PASS_TOKEN":
                    const ft = token.replace(/\$/g, '.');
                    verifiedToken = jwt.verify(ft, AUTH_HASH.JWT_FORGOT_PASS_TOKEN);
                    break;
                case "EMAIL_TOKEN":
                    const et = token.replace(/\$/g, '.');
                    verifiedToken = jwt.verify(et, AUTH_HASH.JWT_EMAIL_TOKEN);
                    break;
                default:
                    break;
            }
            
            if(verifiedToken == null){ throw Error('INVALID_TOKEN_TYPE'); }
            return verifiedToken
        }catch(e){
            console.log("VERIFY_"+type+"_FAILED",e.message)
            throw Error("VERIFY_"+type+"_FAILED");
        }
    },
}

module.exports = {auth}