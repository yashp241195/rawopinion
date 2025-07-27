const Joi = require("joi");

const validationRules = {
    
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string()
    .min(8)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])/)
    .required()
    .messages({
        'string.pattern.base': 'Password must contain at least one upper case letter, one lower case letter, one digit, and one special character'
    }),
    validAge:Joi.number().min(18).max(65).required(),
    googleOAuthSub:Joi.string().pattern(/^[0-9]+$/).min(15).max(30).required(),
    isAlphaNum128:Joi.string().alphanum().min(3).max(128).required(),
     
    firstname:Joi.string().regex(/^[A-Z][a-zA-Z]*$/).messages({
        'string.pattern.base': 'Firstname must start with a capital letter and contain only alphabetic characters.',
    }).required(),
    lastname:Joi.string().regex(/^[A-Z][a-zA-Z]*$/).messages({
        'string.pattern.base': 'Lastname must start with a capital letter and contain only alphabetic characters.',
    }).required(),

    location:Joi.string().pattern(/^[a-zA-Z]*$/).required(),

    bio:Joi.string().regex(/^[a-zA-Z.,\s]*$/).messages({
        'string.pattern.base': 'Bio must contain only alphabetic or full stop or comma characters .',
    }).allow(null),
    username:Joi.string().pattern(/^[a-z0-9]+$/).min(3).max(20).required()
    
}

const validateSchema = {
    
    isSignUpValid:  Joi.object({
        email: validationRules.email,
        password: validationRules.password,
        age: validationRules.validAge,
    }),
    isLoginValid:  Joi.object({
        email: validationRules.email,
        password: validationRules.password,
    }),
    isGoogleAuthValid: Joi.object({
        email: validationRules.email,
        sub: validationRules.googleOAuthSub,
    }),
    isPasswordValid: Joi.object({
        password: validationRules.password,
    }),
    isEmailVaild:  Joi.object({
        email: validationRules.email,
    }),
    isChangePasswordValid: Joi.object({
        password: validationRules.password,
        newPassword: validationRules.password
    }),
    isEditProfileInfoValid: Joi.object({
        firstname: validationRules.firstname,
        lastname: validationRules.lastname,
        bio: validationRules.bio,
        location: validationRules.location
    }),
    isUsernameVaild:  Joi.object({
        username: validationRules.username,
    }),

}

module.exports = { validateSchema, }
