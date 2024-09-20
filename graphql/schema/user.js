const { validateSchema }  = require( "../utils/isvalid")
const UserModel = require('./../models/user')
const { transporter, getEmailBody, } = require('./../utils/email')
const nodemailer = require("nodemailer")

const {
  BlockModel,
} = require('../models/content')

const { 
  calculateAgeFromDate, 
  isoToDateFormatted,
} = require('./../utils/utils')

const { 
  GQLError, isValidInput, 
} = require('./../utils/error')


const UserTypes = `
  

  type ImageType{
    imgid:Int url:String icon_url:String 
    identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String 
    sexy:String hentai:String
  }

  type ProfileInfoType{
    profilePic:ImageType
    bio:String
    location:String
  }

  type PublicProfileType{
    username:String
    publicUsername:String
    followersCount:String
    firstname:String lastname:String 
    profilePic:ImageType
    profileinfo:ProfileInfoType 
  }

  type PublicPageType{
    username:String
  }

  input ImageInput{
    imgid:Int url:String icon_url:String 
    isDelete:Boolean identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:Float porn:Float drawing:Float 
    sexy:Float hentai:Float
  }

  
  input EditProfileInfoInput{  
    bio:String
    location:String
  }

  input SignUpInput{ 
    email:String, password:String, dateofbirth:String 
  }



  type Query{

    login(email:String, password:String):String
    signInWithGoogle(email:String, sub:String):String
    getAccessTokenFromRefreshToken:String
    verifyEmail(token:String):String
    forgotPassword(email:String):String
    resetPassword(token:String, password:String):String
    getProfileInfo:ProfileInfoType
    getProfileView(username:String, view:String):PublicProfileType

  }

  type Mutation {

    signup(inputSignUp:SignUpInput):String
    logout:String
    deactivate(password:String, deleteAccount:Boolean):String
    reactivate:String
    changePassword(password:String,newPassword:String):String
    editProfileInfo(profileInfoInput:EditProfileInfoInput):String
    uploadImage(image:ImageInput):String
  }

`



const UserResolver = {

  Query:{

    login: async(_, args, {req, res, auth})=>{
      
      try{
        
        const { email, password } = args
        isValidInput(validateSchema.isLoginValid, { email, password })
        
        const user = await UserModel.findOne({ email })
        if (!user) { throw Error("EMAIL_NOT_FOUND") }
        
        const isPasswordValid = await user.isValidPassword(password)
        if (!isPasswordValid) { throw Error("INCORRECT_PASSWORD") }
        
        const { _id, isEmailVerified, username } = user
        if(!isEmailVerified){ throw Error("EMAIL_NOT_VERIFIED") }
        
        auth.signToken("REFRESH_TOKEN", { _id, username }, res)
        return auth.signToken("ACCESS_TOKEN",{ _id, username }, null)
      
      }catch(e){

        let ecode, emessage;
        ecode = e.message

        switch(ecode){
          case "EMAIL_NOT_FOUND": 
            emessage = "Email not found"
            break;
          case "INCORRECT_PASSWORD": 
            emessage = "Incorrect password"
            break;
          case "EMAIL_NOT_VERIFIED": 
            emessage = "Email is not verified yet"
            break;
          default:
            ecode = "LOGIN_FAILED"
            emessage = "Login failed"
        }

        return GQLError(ecode, emessage)

      }
    },
    signInWithGoogle:async (_, args,{req, res, auth})=>{

      try{
        console.log(99)
        const { email, sub } = args
        isValidInput(validateSchema.isGoogleAuthValid, { email, sub })
        const user = await UserModel.findOne({ email })
        if (!user) { 
          const newUser = await UserModel({ 
            email, 
            googleAuthId:sub,
            password:null, 
            isEmailVerified:true, 
            hasEssential:false, 
            isBanned:false, 
            isDeactivated:false,
          }).save()        
          const { _id, username } = newUser
          auth.signToken("REFRESH_TOKEN", { _id, username }, res)
          return auth.signToken("ACCESS_TOKEN",{ _id, username }, null)
        }
        const { _id, googleAuthId, username} = user
        if(!googleAuthId){
          const user2 = await UserModel.updateOne({_id,},{$set:{ googleAuthId:sub, isEmailVerified:true}})
          if(user2.modifiedCount!=1){throw Error("CANT_ADD_GOOGLE_AUTH")}
        }
        auth.signToken("REFRESH_TOKEN", {_id, username}, res)
        return auth.signToken("ACCESS_TOKEN",{_id, username}, null)
      }
      catch(e){
        let ecode, emessage;
        ecode = e.message
        console.log("ecode",ecode)

        switch(ecode){
          case "CANT_ADD_GOOGLE_AUTH": 
            emessage = "Sorry, you can't add google auth"
            break;
          case "INVALID_GOOGLE_TOKEN": 
            emessage = "Invalid google token, Please SignUp"
            break;
          case "EMAIL_NOT_VERIFIED": 
            emessage = "Email is not verified yet"
            break;
          default:
            ecode = "LOGIN_GOOGLE_FAILED"
            emessage = "Login Google failed"
        }

        return GQLError(ecode, emessage)

      }
    },
    getAccessTokenFromRefreshToken: async (_, args, { req, auth }) => {
      try{
        const { _id } = auth.verifyToken("REFRESH_TOKEN", null, req)
        return auth.signToken("ACCESS_TOKEN", { _id, username:null }, null)
      }catch(e){
        return GQLError(e.message,"can't generate access token from refresh token")
      }
    },
    verifyEmail: async (_, args, { req, res, auth}) => {
      try{
        const { token } = args
        const { _id } = auth.verifyToken("EMAIL_TOKEN", token, req)
        const user = await UserModel.updateOne({ _id }, { $set: { isEmailVerified: true } })
        if(user.modifiedCount != 1){throw Error("USER_NOT_UPDATED")}
        return "email verification successful"
      }
      catch(e){
        return GQLError(e.message,"email verification failed")
      }
    },
    forgotPassword: async (_, args, { auth,  }) => {
      try{
        const { email } = args
        isValidInput(validateSchema.isEmailVaild, { email })
        const user = await UserModel.findOne({ email })
        if(!user){throw Error("USER_NOT_FOUND")}
        const { _id,  } = user

        const forgetPassToken = auth.signToken("FORGOT_PASS_TOKEN", { _id, }, null)

        const emailBody = await getEmailBody(
          "FORGOT_PASSWORD", { email, forgetPassToken, })

        // console.log("emailBody",email)


        const sender = await nodemailer.createTransport(transporter)
        const info = await sender.sendMail(emailBody)
          
        if(!info){ throw Error("EMAIL_NOT_SENT") }

        return "Password reset link sent successfully at "+email
      }
      catch(e){
        console.log(e.message)
        return GQLError(e.message,"forgot password request failed")
      }
    },
    resetPassword: async (_, args, { auth,  }) => {
      try{
        const { token, password } = args
        const { _id } = auth.verifyToken("FORGOT_PASS_TOKEN", token, null)
        isValidInput(validateSchema.isPasswordValid, { password })
        const user = await UserModel.findOne({ _id });
        if(!user){throw Error("EMAIL_NOT_FOUND")}
        await user.updatePassword(password);
        return "Password reset successfully"
      }
      catch(e){
        return GQLError(e.message,"reset password failed")
      }
    },
    getProfileInfo: async (_, args, { auth, req }) => {
      try{
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        const user = await UserModel.findOne({ _id }, { profileInfo:1, })
        return user.profileInfo
      }
      catch(e){
        return GQLError(e.message,"profile info not found")
      }
    },
    getProfileView: async (_, args, { auth, req }) => {

      try{

        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        const usernameInput = args.username
        const view = args.view
        
        let user = null

        if(usernameInput !== null){

          const users = await UserModel.find({ $or: [{ _id }, { username:usernameInput }] });

          if (users.length < 1) throw new Error("INVALID_REQUEST_Q");
          
          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.username === usernameInput);

          if (!sender || !receiver ){
            throw new Error("INVALID_REQUEST_P");
          }

          if(sender.username !== receiver.username){
            
            const isBlocked = await BlockModel.find({
              $or:[
                {
                  sender: sender.username,
                  receiver: receiver.username,
                },
                {
                  sender: receiver.username,
                  receiver: sender.username,
                }
              ]
            });
  
            if (isBlocked.length !== 0) throw Error("YOURE_BLOCKED");


          }

          user = receiver

        }
        else{

          user = await UserModel.findOne({ _id })
        
        }

        const { 
          profileInfo, username, 
          publicUsername, followersCount,
          isEmailVerified, hasEssential,
          isBanned, isDeactivated,
        } = user

        // console.log("user",user)
        // console.log("followersCount",followersCount)
        // console.log("publicUsername",publicUsername)


        const hasAccess = isEmailVerified && hasEssential 
            && isBanned == false && isDeactivated == false

        if(!hasAccess){throw Error("ACCESS_DENIED")}

        const {
          firstname, 
          lastname,
          bio,
          imageGallery
        } = profileInfo


        if(view == "message"){

          const profilePic = imageGallery.filter(it=>it.imgid == 1)[0].icon_url

          return {

            firstname: firstname,
            lastname: lastname,
            username: username,
            publicUsername:publicUsername, 
            profilePic: profilePic

          }

        }

        if(view == "main"){
          
          const profilePic2 = imageGallery.filter(it=>it.imgid == 1)[0]

          const PublicProfile = {
            username, firstname, lastname, 
            publicUsername, followersCount:followersCount,
            profileinfo:{
              bio
            },
            profilePic: profilePic2,
          }

          return PublicProfile
        
        }
      
      }
      catch(e){
        console.log("eeerrr",e.message)
        return GQLError(e.message,"public profile not found")
      
      }
    },
    

  },

  Mutation: {

    signup: async (_, args, { auth }) => {
      try {

        const { email, password, dateofbirth} = args.inputSignUp
        const dob = new Date(dateofbirth.replace(/^"|"$/g, ""))
        const age = calculateAgeFromDate(dateofbirth)
        isValidInput(validateSchema.isSignUpValid, { email, age, password })

        const newUser = new UserModel({ 
          email, isEmailVerified:false, 
          hasEssential:false, isBanned:false, 
          isDeactivated:false, googleAuthId:null, 
          profileInfo: { dateofbirth:dob, }
        })

        await newUser.setPassword(password)
        await newUser.save()

        const { _id } = newUser

        const emailToken = await auth.signToken("EMAIL_TOKEN", { _id },)
        const emailBody = await getEmailBody(
          "VERIFICATION_EMAIL", { email, emailToken, })

        const sender = await nodemailer.createTransport(transporter)
        const info = await sender.sendMail(emailBody)
        
        if(!info){ throw Error("EMAIL_NOT_SENT") }
        return "Email verification link sent to " + email +" "
        
      } 
      catch (e) {

        if(e.code == 11000){
          return GQLError("EMAIL_EXISTS","Email already exists")
        }
        if(e.message == "EMAIL_NOT_SENT"){
          return GQLError("EMAIL_NOT_SENT","Email sent failed")
        }
        return GQLError("SIGNUP_FAILED","Signup failed")

      }
    },
    logout: async (_, args, { req, res, auth }) => {
      try{
        auth.verifyToken("REFRESH_TOKEN",null,req)
        res.cookie("refreshToken", "", { httpOnly: true, secure: true, maxAge: 0 })
        return "logout success"
      }catch(e){
        return GQLError("LOGOUT_FAILED","logout failed")
      } 
    },
    deactivate: async (_, args, { req, res, auth }) => {
      try{
        const { password, deleteAccount } = args
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        const user = await UserModel.findOne({ _id })
        if (!user) { 
          return GQLError("EMAIL_NOT_FOUND","Email not found") 
        }
        const isPasswordValid = await user.isValidPassword(password)
        if (!isPasswordValid){ 
            return GQLError("INCORRECT_PASSWORD","Incorrect Password") 
        }
        const currentDate = new Date();
        const deleteDate = currentDate;
        deleteDate.setMonth(deleteDate.getMonth() + 1);
        const formattedDate = isoToDateFormatted(deleteDate)
        user.isDeactivated = true
        user.deleteRequestDate = deleteAccount?currentDate:null
        await user.save();

        if(deleteAccount){
          const emailBody = await getEmailBody("SCHEDULE_DELETE", 
            { email:user.email, deleteDate:formattedDate })

          const info = await transporter.sendMail(emailBody)
          if(!info){ return GQLError("EMAIL_NOT_SENT", "Email sent failed.") }
        }
        res.cookie("refreshToken", "", { httpOnly: true, secure: true, maxAge: 0 })
        return deleteAccount?"delete successful":"deactivate successful"
      }
      catch(e){

        if(e.message == "USER_NOT_FOUND"){
          return GQLError("USER_NOT_FOUND","Incorrect Password")
        }

        return GQLError("DEACTIVATE_FAILED","deactivate status change failed")
      }
    },
    reactivate: async (_, args, { req, res, auth }) => {
      try{
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        const user = await UserModel.updateOne({ _id, }, 
          { $set: { isDeactivated:false, deleteRequestDate:null } 
        })
        if(user.modifiedCount != 1){throw Error("USER_NOT_UPDATED")}
        return "account reactivate successful"
      }catch(e){
        return GQLError(e.message,"account reactivate failed")
      }
    },
    changePassword: async (_, args, { req, res, auth }) => {
      try{
        const { password, newPassword } = args
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        isValidInput(validateSchema.isChangePasswordValid, { password, newPassword })
        if(password == newPassword){throw Error("OLD_NEW_PASSWORD_SAME")}
        const user = await UserModel.findOne({ _id })
        const isValidPassword = user.isValidPassword(password)
        if(!isValidPassword){ throw Error("INCORRECT_PASSWORD") }
        await user.updatePassword(newPassword)
        return "password changed successfully"
      }
      catch(e){

        if(e.message == "OLD_NEW_PASSWORD_SAME"){
          ecode = e.code
          emessage = "New password can'\t be same as old password"
        }

        if(e.message == "INCORRECT_PASSWORD"){
          ecode = e.message
          emessage = "Incorrect current password"
        }

        return GQLError("SIGNUP_FAILED","password change failed")

      }
    },
    editProfileInfo: async (_, args, { req, res, auth }) => {
      try{
        const profileInfo = args.profileInfoInput
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        isValidInput(validateSchema.isEditProfileInfoValid, profileInfo)

        const updatedUser = await UserModel.updateOne({ _id, }, { 
          $set: { 
            "profileInfo.bio":profileInfo.bio,
            "profileInfo.jobrole":profileInfo.jobrole,
            "profileInfo.company":profileInfo.company,
           } 
        })

        if (updatedUser.modifiedCount != 1) { 
          return GQLError("USER_UPDATE_FAILED","user update failed") 
        }
        
        return "success"
      }
      catch(e){
        console.log(e.message)
        return GQLError("EDIT_PROFILE_FAILED","edit profile failed")
      }
    },
    uploadImage: async (_, args, { req, res, auth }) => {
      try{
        
        const {
          imgid, url, icon_url, identifiedAs, 
          filter, isProfileSafe, isSafe, 
          neutral, porn, drawing, sexy, hentai,
        } = args.image

        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

        const updatedUser = await UserModel.findOneAndUpdate(
          { _id, "profileInfo.imageGallery.imgid":imgid }, 
          { 
            $set: { 
              "profileInfo.imageGallery.$.imgid": imgid, 
              "profileInfo.imageGallery.$.url": url, 
              "profileInfo.imageGallery.$.icon_url": icon_url, 
              "profileInfo.imageGallery.$.identifiedAs": identifiedAs, 
              "profileInfo.imageGallery.$.filter": filter, 
              "profileInfo.imageGallery.$.isProfileSafe": isProfileSafe, 
              "profileInfo.imageGallery.$.isSafe": isSafe, 
              "profileInfo.imageGallery.$.neutral": neutral, 
              "profileInfo.imageGallery.$.porn": porn, 
              "profileInfo.imageGallery.$.drawing": drawing, 
              "profileInfo.imageGallery.$.sexy": sexy, 
              "profileInfo.imageGallery.$.hentai": hentai,
            } 
          }
        )

        if (!updatedUser) { 
          const updatedUser2 = await UserModel.updateOne(
            { _id, }, 
            { 
              $push: { 
                "profileInfo.imageGallery":{
                  imgid, url, icon_url, 
                  identifiedAs, filter, isProfileSafe, isSafe,
                  neutral, porn, drawing, sexy, hentai,
                } 
              } 
            }
          )
          if(updatedUser2.modifiedCount!=1){
            throw Error("USER_UPDATE_FAILED") 
          }
        }
        return "image uploaded successfully"
      }
      catch(e){
        return GQLError("IMAGE_UPLOAD_FAILED","image upload failed")
      } 
    },

  },

}


module.exports = { UserTypes, UserResolver }
