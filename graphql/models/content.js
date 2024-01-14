const mongoose = require( "mongoose");

const ImageSchema = new mongoose.Schema({
    imgid:Number, url:String, icon_url:String,
    identifiedAs:String, filter:String, 
    isProfileSafe:Boolean, isSafe:Boolean,
    porn:Number, drawing:Number, sexy:Number, 
    hentai:Number, neutral:Number,
})

const PostSchema = new mongoose.Schema({
    postedBy:String, 
    page_username:String, 
    postTitle:String, postContent:String, postImage:ImageSchema, 
    upvoteCount:Number, downvoteCount:Number, contextOutCount:Number,
    timestamp: { type: Date, default: Date.now },
})

const PageSchema = new mongoose.Schema({
    page_username:String,
    pageTitle:String, pageLogo:ImageSchema, pageBio:String,
    timestamp: { type: Date, default: Date.now },
})

const CommentSchema = new mongoose.Schema({
    commentBy:String, commentContent:String, commentImage:ImageSchema,
    upvoteCount:Number, downvoteCount:Number, contextOutCount:Number,
    postId:String, repliedToCommentId:String,
    timestamp: { type: Date, default: Date.now },
})

const RequestSchema = new mongoose.Schema({
    sender:String, receiver:String, status:String,
    timestamp: { type: Date, default: Date.now },
})

const MatchSchema = new mongoose.Schema({
    sender: String, receiver: String, type:String,
    timestamp: { type: Date, default: Date.now },
})


RequestSchema.index({sender:1, receiver:1})
MatchSchema.index({sender:1, receiver:1, timestamp:-1})

const RequestModel = mongoose.model('request',RequestSchema)
const MatchModel = mongoose.model('match',MatchSchema)

const BlockSchema = new mongoose.Schema({
    sender:String, receiver:String,
    timestamp: { type: Date, default: Date.now },
})

const ReportSchema = new mongoose.Schema({
    sender:String, receiver:String, message:String,
    timestamp: { type: Date, default: Date.now },
})

BlockSchema.index({sender:1, receiver:1})

const BlockModel = mongoose.model('block',BlockSchema)
const ReportModel = mongoose.model('report',ReportSchema)

const PostModel = mongoose.model('post',PostSchema)
const CommentModel = mongoose.model('comment',CommentSchema)
const PageModel = mongoose.model('page',PageSchema)

module.exports = { 
    ReportModel, BlockModel, RequestModel, MatchModel,
    PostModel, CommentModel, PageModel
}
