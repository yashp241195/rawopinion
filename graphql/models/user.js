const mongoose = require( "mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const { AUTH_HASH } = require("../../config")

const ImageSchema = new mongoose.Schema({
    imgid:Number, url:String, icon_url:String,
    identifiedAs:String, filter:String, 
    isProfileSafe:Boolean, isSafe:Boolean,
    porn:Number, drawing:Number, sexy:Number, 
    hentai:Number, neutral:Number,
})

const ProfileInfoSchema = new mongoose.Schema({
    openfor:String,
    firstname:String, lastname:String,
    contextoutCount:Number, 
    followersCount:Number,  upvotesCount:Number, downvotesCount:Number, 
    dateofbirth:Date,
    profilePic:ImageSchema,
    bio:String,
})

const UserSchema = new mongoose.Schema({
    username:String,
    public_username:{
        type: String,
        required: true,
        unique: true 
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    isEmailVerified: Boolean,
    password:String, 
    googleAuthId:String,
    profileInfo:ProfileInfoSchema,
    hasEssential: Boolean,
    isBanned:Boolean,
    isDeactivated:Boolean,
    lastSeenDate:Date,
    deleteRequestDate:Date,
})

UserSchema.methods.setPassword = function (password) {
    this.salt = bcrypt.genSaltSync(10); 
    this.password = bcrypt.hashSync(password, this.salt); 
};
  
UserSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.updatePassword = async function (newPassword) {
    await this.setPassword(newPassword);
    await this.save();
};

UserSchema.pre('save', function (next) {
    if (this.isModified('email')) {
        const inputValue = this.email + AUTH_HASH.CONSTANT_USERNAME_SALT
        const hashedUsername = crypto.SHA256(inputValue).toString(crypto.enc.Hex);
        this.username = hashedUsername; 
    }
    next();
});

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel
