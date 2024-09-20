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

    openfor:Joi.string().valid("FRIENDSHIP", "DATING", "MARRIAGE").required(),
    gender:Joi.string().valid("MALE", "FEMALE", "OTHER").required(),

    orientation:Joi.string().valid("STRAIGHT", "HOMOSEXUAL", "BISEXUAL", "OTHER").required(),
    validHeight:Joi.number().min(50).max(300).required(),
    maxdistance:Joi.string().valid("Local 2 KM","Nearby Locality 10 KM","Within City 100 KM","Other Nearby City 300 KM","Global 300 KM Above").required(),
    
    physique:Joi.string().valid("SKINNY","ATHELETIC","AVERAGE","OBESE",null).required(),
    educationlevel:Joi.string().valid("SCHOOL","UNDERGRAD","POSTGRAD","DOCTORATE",null).required(),
    religionlimit:Joi.string().valid("SAME AS MINE","OPEN FOR ALL",null).required(),
    religion:Joi.string().valid( 
        "HINDUISM", "ISLAM", "CHRISTIAN", "SIKH",
        "BUDDHISM", "JAIN", "JUDAISM", "ZOROASTRIANISM",
        "CHINESE", "AFRICAN", "SHINTO", "CAODAI", "OTHER", 
        "ATHIEST",null),
    food:Joi.string().valid("NONVEG","VEG","VEGAN",null),
    smoke:Joi.string().valid("ADDICT","REGULAR","OCCASIONAL","NONSMOKER",null),
    drink:Joi.string().valid("ADDICT","REGULAR","OCCASIONAL","NONDRINKER",null),
    course:Joi.string().regex(/^[a-zA-Z,\s]*$/).messages({
        'string.pattern.base': 'Course must contain only alphabets or comma.',
    }).allow(null),
    college:Joi.string().regex(/^[a-zA-Z.,\s]*$/).messages({
        'string.pattern.base': 'College must contain only alphabets or comma.',
    }).allow(null),
    jobrole:Joi.string().regex(/^[a-zA-Z.,\s]*$/).messages({
        'string.pattern.base': 'JobRole must contain only alphabets or comma.',
    }).allow(null),
    company:Joi.string().regex(/^[a-zA-Z.,\s]*$/).messages({
        'string.pattern.base': 'Company must contain only alphabets or comma.',
    }).allow(null),
    bio:Joi.string().regex(/^[a-zA-Z.,\s]*$/).messages({
        'string.pattern.base': 'Bio must contain only alphabetic or full stop or comma characters .',
    }).allow(null),
    activities:Joi.array().items(Joi.string()).max(5),
    maritalStatus:Joi.string().valid("NEVER MARRIED", "DIVORCED", "WIDOW", "SEPARATED",null),
    wantChildren:Joi.string().valid("YES", "NOT SURE", "NEVER", null)

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
    isEssentialVaild:  Joi.object({
        firstname: validationRules.firstname,
        lastname: validationRules.lastname,
        openfor: validationRules.openfor,
        gender: validationRules.gender,
        genderpreference: validationRules.gender,
        orientation: validationRules.orientation,
        age: validationRules.validAge,
    }),
    isChangePasswordValid: Joi.object({
        password: validationRules.password,
        newPassword: validationRules.password
    }),
    isEditPreferencesValid: Joi.object({
        genderpreference: validationRules.gender, 
        maxdistance:validationRules.maxdistance,
        minage:validationRules.validAge, 
        maxage:validationRules.validAge,
        minheight:validationRules.validHeight, 
        physiquelimit:validationRules.physique, 
        mineducation:validationRules.educationlevel, 
        religionlimit:validationRules.religionlimit,
        foodlimit:validationRules.food, 
        drinklimit:validationRules.drink, 
        smokelimit:validationRules.smoke,
        maritalpreference: validationRules.maritalStatus,
    }),
    isEditProfileInfoValid: Joi.object({
        bio: validationRules.bio,
        activities: validationRules.activities,
        openfor: validationRules.openfor,
        height: validationRules.validHeight,
        physique: validationRules.physique,
        educationlevel: validationRules.educationlevel,
        course: validationRules.course,
        college: validationRules.college,
        jobrole: validationRules.jobrole,
        company: validationRules.company,
        religion: validationRules.religion,
        myfoodlimit: validationRules.food,
        foodpreference: validationRules.food,
        mydrinklimit: validationRules.drink,
        mysmokelimit: validationRules.smoke,
        maritalstatus: validationRules.maritalStatus,
        wantchildren: validationRules.wantChildren,
        location: Joi.alternatives()
          .try(
            Joi.object({
              address: Joi.string(),
              country: Joi.string(),
            })
            , null),
    })

}

module.exports = { validateSchema, }
