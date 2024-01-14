const { validateSchema }  = require( "../validation/isvalid")
const UserModel = require('./../models/user')
const { sendEmail } = require('./../utils/email')
const { 
  calculateAgeFromDate, isValidInput, 
  GQLErrorFilter, 
  isoToDateFormatted, removeQuotesFromString 
} = require('./../utils/utils')


const UserTypes = `

  input ImageInput{
    imgid:Int url:String icon_url:String 
    isDelete:Boolean identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String sexy:String hentai:String
  }

  type ImageType{
    imgid:Int url:String icon_url:String 
    identifiedAs:String filter:String isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String sexy:String hentai:String
  }

  type ProfileInfoType{
    bio:String openfor:String
    profilePic:ImageType
  }

  type PublicProfileType{
    username:String public_username:String
    firstname:String lastname:String
    openfor:String age:Int bio:String
    contextoutCount:String downvotesCount:String upvotesCount:String
    followersCount:String profilePic:ImageType
  }

  input EditProfileInfoInput{ bio:String openfor:String }

  input EssentialInput{ 
    firstname:String lastname:String public_username:String 
    dateofbirth:String profilepic:ImageInput
  }

  input SignUpInput{ email:String, password:String, dateofbirth:String }
  
  type Query{

    login(email:String, password:String):String
    signInWithGoogle(email:String, sub:String):String
    getAccessTokenFromRefreshToken:String
    verifyEmail(token:String):String
    forgotPassword(email:String):String
    resetPassword(token:String, password:String):String
    getProfileInfo:ProfileInfoType
    getProfileView(username:String):PublicProfileType
  
  }

  type Mutation {

    signup(inputSignUp:SignUpInput):String
    signupWithGoogle(email:String, sub:String):String
    logout:String
    deactivate(password:String, deleteAccount:Boolean):String
    reactivate:String
    changePassword(password:String, newPassword:String):String
    updateEssential(essentialInput:EssentialInput):String
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
      }
      catch(e){
        return GQLErrorFilter(e.message, "Login failed",
          [
            ["EMAIL_NOT_FOUND","Email not found"],
            ["INCORRECT_PASSWORD","Incorrect password"],
            ["EMAIL_NOT_VERIFIED","Email is not verified yet"],
          ]
        )
      }
    },
    signInWithGoogle:async (_, args,{req, res, auth})=>{
      try{
        const { email, sub } = args
        isValidInput(validateSchema.isGoogleAuthValid, { email, sub })
        const user = await UserModel.findOne({ email },{ isBanned:1, googleAuthId:1, })
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
          const { _id, } = newUser
          auth.signToken("REFRESH_TOKEN", { _id, username }, res)
          return auth.signToken("ACCESS_TOKEN",{ _id, username }, null)
        }
        const { _id, googleAuthId, username} = user
        if(!googleAuthId){
          const user = await UserModel.updateOne({_id,},{$set:{ googleAuthId:sub, isEmailVerified:true}})
          if(user.modifiedCount!=1){throw Error("CANT_ADD_GOOGLE_AUTH")}
        }
        auth.signToken("REFRESH_TOKEN", {_id, username}, res)
        return auth.signToken("ACCESS_TOKEN",{_id, username}, null)
      }
      catch(e){
        return GQLErrorFilter(e.message,"Login Google failed",
          [
            ["EMAIL_NOT_VERIFIED","Email is not verified yet"],
            ["INVALID_GOOGLE_TOKEN","Invalid google token, Please SignUp"],
            ["CANT_ADD_GOOGLE_AUTH","Sorry, you can't add google auth"],
          ]          
        )
      }
    },
    getAccessTokenFromRefreshToken: async (_, args, { req, auth }) => {
      try{
        const { _id } = auth.verifyToken("REFRESH_TOKEN", null, req)
        return auth.signToken("ACCESS_TOKEN", { _id, username:null }, null)
      }catch(e){
        return GQLErrorFilter(e.message,"can't generate access token from refresh token", null)
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
        return GQLErrorFilter(e.message,"email verification failed",null)
      }
    },
    forgotPassword: async (_, args, { auth,  }) => {
      try{
        const { email } = args
        isValidInput(validateSchema.isEmailVaild, { email })
        const user = await UserModel.findOne({ email })
        if(!user){throw Error("USER_NOT_FOUND")}
        const { _id } = user
        const forgetPassToken = auth.signToken("FORGOT_PASS_TOKEN", { _id, }, null)
        sendEmail("FORGOT_PASSWORD", { email, forgetPassToken, })
        return "Password reset link sent successfully at "+email
      }
      catch(e){
        return GQLErrorFilter(e.message,"forgot password request failed",
          [
            ["USER_NOT_FOUND","Email doesn't exists"],
          ]          
        )
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
        return GQLErrorFilter(e.message,"reset password failed",
          [
            ["EMAIL_NOT_FOUND","email not found"],
          ]
        )
      }
    },
    getProfileInfo: async (_, args, { auth, req }) => {
      try{
        // const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        // const user = await UserModel.findOne({ _id }, { profileInfo:1, })
        // console.log("getting profile info ",user.profileInfo)
        // return user.profileInfo
        return {bio:"Hello"}
        // return "Hello"
      }
      catch(e){
        console.log("e.message",e.message)
        return GQLErrorFilter(e.message,"profile info not found", null)
      }
    },
    getProfileView: async (_, args, { auth, req }) => {
      try{
        const usernameInput = args.username
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        let user = null
        user = await UserModel.findOne({ _id })
        if(usernameInput == null){
          user = await UserModel.findOne({ _id })
        }
        else{
          user = await UserModel.findOne({ username:usernameInput })
          return {
            username:usernameInput,
            firstname:"F"+usernameInput,
            lastname:"L"+usernameInput,
            lastseen:"last seen recently"
          }
        }

        const { 
          profileInfo, username, public_username, 
          isEmailVerified, hasEssential, isBanned, isDeactivated,
        } = user

        const hasAccess = isEmailVerified && hasEssential 
            && isBanned == false && isDeactivated == false

        if(!hasAccess){throw Error("ACCESS_DENIED")}

        const { 
          dateofbirth, firstname, lastname, openfor, bio, 
          contextoutCount, downvotesCount, upvotesCount, 
          followersCount, profilePic
        } = profileInfo

        const age = calculateAgeFromDate(dateofbirth)
        
        const PublicProfile = { 
          public_username, username, age, 
          firstname, lastname, openfor,
          bio, contextoutCount, downvotesCount, 
          upvotesCount, followersCount, profilePic
        }

        return PublicProfile

      }
      catch(e){
        console.log("e.message",e.message)
        return GQLErrorFilter(e.message,"public profile not found",
          [
            ["ACCESS_DENIED","You can't access this profile"],
          ]
        )
      }
    },
    

  },

  Mutation: {

    signup: async (_, args, { auth }) => {
      try {
        const { email, password, dateofbirth} = args.inputSignUp
        const dob = new Date(removeQuotesFromString(dateofbirth))
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
        const emailToken = auth.signToken("EMAIL_TOKEN", { _id },)
        sendEmail("VERIFICATION_EMAIL", { email, emailToken, })
        return "Email verification link sent to " + email +" "
      } 
      catch (e) {
        return GQLErrorFilter(parseInt(e.code), "Signup failed",
          [
            [11000,"Email already exists."],
          ]
        )
      }
    },
    signupWithGoogle: async (_, args, { res, auth, req }) => {
      try {
        const { email, sub,} = args
        isValidInput(validateSchema.isGoogleAuthValid, { email, sub, })
        const newUser = await UserModel({ 
          email, googleAuthId:sub, 
          isEmailVerified:true, hasEssential:false, 
          isBanned:false, 
          isDeactivated:false, 
        }).save()        
        const { _id, } = newUser
        auth.signToken("REFRESH_TOKEN", { _id, username }, res)
        return auth.signToken("ACCESS_TOKEN",{ _id, username }, null)
      } catch (e) {
          return GQLErrorFilter(parseInt(e.code), "Signup Google failed",
            [
              [11000,"Email already exists."],
            ]
          )        
      }
    },
    logout: async (_, args, { req, res, auth }) => {
      try{
        auth.verifyToken("REFRESH_TOKEN",null,req)
        res.cookie("refreshToken", "", { httpOnly: true, secure: true, maxAge: 0 })
        return "logout success"
      }catch(e){
        GQLErrorFilter(e.message,"logout failed",null)
      } 
    },
    deactivate: async (_, args, { req, res, auth }) => {
      try{
        const { password, deleteAccount } = args
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
        const user = await UserModel.findOne({ _id })
        if (!user) { throw Error("EMAIL_NOT_FOUND") }
        const isPasswordValid = await user.isValidPassword(password)
        if (!isPasswordValid) { throw Error("INCORRECT_PASSWORD") }
        const currentDate = new Date();
        const deleteDate = currentDate;
        deleteDate.setMonth(deleteDate.getMonth() + 1);
        const formattedDate = isoToDateFormatted(deleteDate)
        user.isDeactivated = true
        user.deleteRequestDate = deleteAccount?currentDate:null
        await user.save();
        if(deleteAccount){
          sendEmail("SCHEDULE_DELETE", { email:user.email, deleteDate:formattedDate })
        }
        res.cookie("refreshToken", "", { httpOnly: true, secure: true, maxAge: 0 })
        return deleteAccount?"delete successful":"deactivate successful"
      }catch(e){
        return GQLErrorFilter(e.message, "deactivate status change failed",
          [
            ["USER_NOT_FOUND","Incorrect current password"],
            ["USER_NOT_UPDATED","deactivate status change failed"],
          ]
        )
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
        return GQLErrorFilter(e.message,"account reactivate failed",null)
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
      }catch(e){
        return GQLErrorFilter(e.message, "password change failed",
          [
            ["OLD_NEW_PASSWORD_SAME","New password can'\t be same as old password"],
            ["INCORRECT_PASSWORD","Incorrect current password"],
          ]
        )
      }
    },
    updateEssential: async (_, args, { req, res, auth }) => {
      try{
        const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

        console.log("args.essentialInput",args.essentialInput)
        const {
          firstname, lastname, openfor,
          gender, orientation, 
          dateofbirth, genderpreference,
          profilepic
        } = args.essentialInput

        const {
          imgid, url, icon_url, 
          identifiedAs, filter, isProfileSafe, isSafe,
          neutral, porn, drawing, sexy, hentai,
        } = profilepic

        const dob = new Date(removeQuotesFromString(dateofbirth))
        const age = calculateAgeFromDate(dateofbirth)

        isValidInput(validateSchema.isEssentialVaild, { 
          firstname, lastname, openfor,
          gender, orientation, age,
          genderpreference,
        })

        if(!isProfileSafe){throw Error("PROFILE_PIC_NOT_FOUND")}

        const user = await UserModel.updateOne({ _id, }, { 
          $set: { 
            hasEssential:true,
            profileInfo:{
              imageGallery:[
                {
                  imgid, url, icon_url, 
                  identifiedAs, filter, isProfileSafe, isSafe,
                  neutral, porn, drawing, sexy, hentai,              
                }
              ],
              firstname, lastname, openfor,
              gender, orientation,
              dateofbirth:dob,
            },
            preferences:{
              genderpreference
            } 
          } 
        })

        if(user.modifiedCount != 1){throw Error("USER_NOT_UPDATED")}
        return "essential changed successfully"
      }
      catch(e){
        return GQLErrorFilter(e.message,"Update essential failed",
          [
            ["UPDATE_ESSENTIAL_FAILED","Update essential failed"],
            ["PROFILE_PIC_NOT_FOUND","Profile pic not found"],
          ]          
        )

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
            "profileInfo.activities":profileInfo.activities,
            "profileInfo.openfor":profileInfo.openfor,
            "profileInfo.height":profileInfo.height,
            "profileInfo.physique":profileInfo.physique,
            "profileInfo.educationlevel":profileInfo.educationlevel,
            "profileInfo.religion":profileInfo.religion,
            "profileInfo.course":profileInfo.course,
            "profileInfo.college":profileInfo.college,
            "profileInfo.jobrole":profileInfo.jobrole,
            "profileInfo.company":profileInfo.company,
            "profileInfo.foodpreference":profileInfo.foodpreference,
            "profileInfo.myfoodlimit":profileInfo.myfoodlimit,
            "profileInfo.mydrinklimit":profileInfo.mydrinklimit,
            "profileInfo.mysmokelimit":profileInfo.mysmokelimit,
           } 
        })
        if (updatedUser.modifiedCount != 1) { throw Error("USER_UPDATE_FAILED") }
        return "success"
      }catch(e){
        return GQLErrorFilter(e.message,"edit profile failed",null)
      }
    },
    uploadImage: async (_, args, { req, res, auth }) => {
      try{
        
        const {
          imgid, url, icon_url, 
          identifiedAs, filter, isProfileSafe, isSafe,
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
        return GQLErrorFilter(e.message,"image upload failed",null)
      } 
    },
    

  },

}



module.exports = { UserTypes, UserResolver }
