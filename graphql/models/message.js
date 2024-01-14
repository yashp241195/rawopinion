const mongoose = require( "mongoose");

const MessageContentSchema = new mongoose.Schema({
    image:String, sticker:String, message:String
})

const MessageSchema = new mongoose.Schema({
    sender:String, receiver:String,
    message:MessageContentSchema,
    deletedBySender:Boolean, 
    deletedByReciever:Boolean,
    timestamp: { type: Date, default: Date.now },
    readAt: { type: Date },
})

const NotificationContentSchema = new mongoose.Schema({
    heading:String, icon:String, message:String
})

const NotificationSchema = new mongoose.Schema({
    username:String, 
    message:NotificationContentSchema, 
    timestamp: { type: Date, default: Date.now },
    readAt: { type: Date },
})

NotificationSchema.index({ username:1, timestamp:-1 })
MessageSchema.index({ sender:1, receiver:1, timestamp:-1 })

const NotificationModel = mongoose.model('notification',NotificationSchema)
const MessageModel = mongoose.model('message',MessageSchema)

module.exports = {MessageModel, NotificationModel}
