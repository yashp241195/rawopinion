const mongoose = require( "mongoose");

const ImageSchema = new mongoose.Schema({
    imgid:Number, url:String, icon_url:String,
    identifiedAs:String, filter:String, 
    isProfileSafe:Boolean, isSafe:Boolean,
    porn:Number, drawing:Number, sexy:Number, 
    hentai:Number, neutral:Number,
})

const ContentSchema = new mongoose.Schema({
    text: String, image: ImageSchema
})

const PostSchema = new mongoose.Schema({
    personUsername:String, 
    title:String, 
    content: ContentSchema,
    upvoteCount:Number, downvoteCount:Number, 
    timestamp: { type: Date, default: Date.now },
})

const CommentSchema = new mongoose.Schema({
    personUsername:String, 
    postId: String, 
    commentContent: ContentSchema,
    upvoteCount:Number, downvoteCount:Number, 
    contextOutCount:Number,
    parentCommentId: { type:String, default:null },
    timestamp: { type: Date, default: Date.now },
})

const VoteSchema = new mongoose.Schema({
    personUsername:String, 
    type:String,
    postId: String, 
    commentId: String, 
    upvote:Boolean,
    contextOut:Boolean,
    timestamp: { type: Date, default: Date.now },
})

const FollowSchema = new mongoose.Schema({
    sender:String, 
    receiver:String, 
    type:String,
    timestamp: { type: Date, default: Date.now },
})

const BlockSchema = new mongoose.Schema({
    sender:String, receiver:String,
    report:String,
    timestamp: { type: Date, default: Date.now },
})

const MessageContentSchema = new mongoose.Schema({
    image:String, sticker:String, message:String
})

const MessageSchema = new mongoose.Schema({
    sender:String, receiver:String,
    content: MessageContentSchema,
    timestamp: { type: Date, default: Date.now },
})

const NotificationSchema = new mongoose.Schema({
    username:String, message:String, type:String,
    timestamp: { type: Date, default: Date.now }
})

FollowSchema.index({sender:1, receiver:1, timestamp:-1})
MessageSchema.index({ sender:1, receiver:1, timestamp:-1 })

const VoteModel = mongoose.model('vote',VoteSchema)
const PostModel = mongoose.model('post',PostSchema)
const CommentModel = mongoose.model('comment',CommentSchema)

const FollowModel = mongoose.model('follow',FollowSchema)
const BlockModel = mongoose.model('block',BlockSchema)
const MessageModel = mongoose.model('message',MessageSchema)
const NotificationModel = mongoose.model('notification',NotificationSchema)


module.exports = { 
    VoteModel, PostModel, CommentModel, 
    FollowModel, BlockModel, MessageModel, NotificationModel
}
