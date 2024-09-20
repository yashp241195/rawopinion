const { GQLError } = require("../utils/error")
const UserModel = require('../models/user')

const{ formatLastSeen } = require("../utils/utils")


const { 

  BlockModel, 
  MessageModel, NotificationModel,
  FollowModel,
  PostModel,
  CommentModel,
  VoteModel

} = require('../models/content')



const ContentTypes = `

  type MessageContentType {
    image: String
    sticker: String
    message: String
  }

  type MessageType {
    id: String
    sender: String
    receiver: String
    content: MessageContentType
    timestamp: String 
  }

  type PaginatedMessages {
    currentPage: Int
    totalPages: Int
    messages: [MessageType]
  }


  type MessageNode{ 
    username:String 
    firstname:String 
    lastname:String 
    profilePic:String 
    latestMessage: MessageContentType 
  }

  type NotificationType{
    username:String 
    type:String
    message:String 
    timestamp:String
  }

  input MessageContentInput{
    image: String
    sticker: String
    message: String
  }

  input MessageInput{ 
    username:String 
    content:MessageContentInput 
  }

  type ImageType{
    imgid:Int url:String icon_url:String 
    identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String 
    sexy:String hentai:String
  }

  type ContentType{
    text: String, image: ImageType
  }

  type PostType{
    personPublicUsername: String 
    title: String 
    content: ContentType
    upvoteCount:Int downvoteCount:Int
    timestamp: String
  }

  type CommentType{
    personPublicUsername:String 
    commentContent: ContentType
    upvoteCount:Int 
    downvoteCount:Int 
    contextOutCount:Int
    repliedToComments: [CommentType]
    timestamp: String
  }

  type PaginatedComments{
    currentPage: Int
    totalPages: Int
    messages: [CommentType]
  }
  

  type FollowType{ 
    firstname:String 
    lastname:String 
    username:String 
    pic:String 
  }

  type PaginatedFollow{
    currentPage: Int
    totalPages: Int
    followSwitch:String
    follow:[FollowType]
  }

  input VoteInput{
    type:String
    postId:String
    commentId:String
    upvote:Boolean
  }

  input ImageInput{
    imgid:Int url:String icon_url:String 
    isDelete:Boolean identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:Float porn:Float drawing:Float 
    sexy:Float hentai:Float
  }


  input ContentInput{
    text:String
    image:ImageInput
  }

  input PostInput{
    postId:String
    title: String 
    content: ContentInput
    operation:String
  }

  input CommentInput{
    postId:String
    title: String 
    content: ContentInput
    operation:String
  }


  input SearchInput{
    searchTerm:String
    pageNo:Int
  }

  type PaginatedSearchResults{ 
    posts: [PostType] 
    people: [FollowType]  
    currentPage: Int
    totalPages: Int
    resultCount: Int
  }
  

  type Query{

    getSearchResults(searchInput:SearchInput):PaginatedSearchResults

    getPost(postId:String):PostType
    getComments(postId:String, parentCommentId:String, pageNo:Int):PaginatedComments
    getFollowers(publicUsername:String, followSwitch:String, pageNo:Int):PaginatedFollow
    
    isPublicUsernameAvailable(publicUsername:String,type:String):String

    findsenders(inboxType:String, pageNo:Int):[MessageNode]
    getMessages(username:String, pageNo:Int):PaginatedMessages
    getNotifications:[NotificationType]

  }

  type Mutation { 
    
    sendRequest(publicUsername:String, type:String):String

    sendVote(voteInput:VoteInput):String
    addPost(postInput:PostInput):String
    addComment(commentInput:CommentInput):String

    selectConversation(username:String, option:String, report:String):String
    sendMessage(messageInput:MessageInput):MessageType
    changePublicUsername(newUsername:String, type:String):String

  
  }

  type Subscription {

    newMessages: MessageType
  
  }


`

const ContentResolver = {

    Query:{
      
      getSearchResults: async (_, args, { auth, req }) => {
        
        try{

          const result =  { 
            posts: [], 
            people: null, 
            resultCount:15, 
            currentPage: 1,
            totalPages: 5
          }
  
          return result
  
        }
        catch(e){
  
          console.log(e.message)
  
          return GQLError("RECOMM_ERROR","Unable to recommend")
          
        }
      },

      getPost: async (parents, args, { req, res, auth }) => {
        
        try {

          // const { postId } = args

          // const post = await PostModel.findOne({ postId });      
          // if (!post) { throw new Error("Post not found"); }
          const post = null;
      
          return post;

        } 
        catch (e) {
        
          console.error("Error fetching matches:", e); 
          return GQLError(e.message, "Can't get matches");
        
        }
      },

      
      getComments: async (parents, args, { req, res, auth }) => {
        
        try {
          

        } 
        catch (e) {
        
          console.error("Error fetching matches:", e); 
          return GQLError(e.message, "Can't get matches");
        
        }
      },

      getFollowers: async (parents, args, { req, res, auth }) => {
        try {
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
      
          const user = await UserModel.findOne({ _id }, { username: 1 });      
          if (!user) { throw new Error("User not found"); }

          const { publicUsername, followSwitch, pageNo} = args

          if(followSwitch == "FOLLOW"){
            
            const matchlist = await FollowModel.aggregate([
              {
                $match: {
                  $or: [
                    { sender: user.username },
                    { receiver: user.username }
                  ]
                }
              },
              {
                $lookup: {
                  from: 'users', 
                  let: { 
                    matchedUsername: { 
                      $cond: { 
                        if: { $eq: ["$sender", user.username] }, 
                        then: "$receiver", else: "$sender" 
                      } 
                    } 
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $ne: ["$username", user.username] }, 
                        $expr: { $eq: ["$username", "$$matchedUsername"] } 
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        username: 1,
                        "profileInfo.firstname": 1,
                        "profileInfo.lastname": 1,
                        icon_url: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$profileInfo.imageGallery",
                                as: "image",
                                cond: { $eq: ["$$image.imgid", 1] } 
                              }
                            },
                            0 
                          ]
                        }
                      }
                    }
                  ],
                  as: 'userDetails'
                }
              },
              {
                $unwind: "$userDetails" 
              },
              {
                $project: {
                  firstname: "$userDetails.profileInfo.firstname",
                  lastname: "$userDetails.profileInfo.lastname",
                  openfor:1,
                  username: "$userDetails.username",
                  pic: "$userDetails.icon_url.icon_url", 
  
                }
              }
            ]);
        
            return matchlist;

          }

          if(followSwitch == "UNFOLLOW"){
            
            const matchlist = await FollowModel.aggregate([
              {
                $match: {
                  $or: [
                    { sender: user.username },
                    { receiver: user.username }
                  ]
                }
              },
              {
                $lookup: {
                  from: 'users', 
                  let: { 
                    matchedUsername: { 
                      $cond: { 
                        if: { $eq: ["$sender", user.username] }, 
                        then: "$receiver", else: "$sender" 
                      } 
                    } 
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $ne: ["$username", user.username] }, 
                        $expr: { $eq: ["$username", "$$matchedUsername"] } 
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        username: 1,
                        "profileInfo.firstname": 1,
                        "profileInfo.lastname": 1,
                        icon_url: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$profileInfo.imageGallery",
                                as: "image",
                                cond: { $eq: ["$$image.imgid", 1] } 
                              }
                            },
                            0 
                          ]
                        }
                      }
                    }
                  ],
                  as: 'userDetails'
                }
              },
              {
                $unwind: "$userDetails" 
              },
              {
                $project: {
                  firstname: "$userDetails.profileInfo.firstname",
                  lastname: "$userDetails.profileInfo.lastname",
                  openfor:1,
                  username: "$userDetails.username",
                  pic: "$userDetails.icon_url.icon_url", 
  
                }
              }
            ]);
        
            return matchlist;

          }

          

        } 
        catch (e) {
        
          console.error("Error fetching matches:", e); 
          return GQLError(e.message, "Can't get matches");
        
        }
      },
      
      findsenders: async (parents, args, { req, res, auth,}) => {
        
        try {
          
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          
          const user = await UserModel.findOne({ _id })
          
          if(!user){ throw Error("USER_NOT_FOUND") }
          
          const username = user.username

          const result = await MessageModel.aggregate(
          
            [
              // Stage 1: Filter messages involving the given username
              {
                $match: {
                  $or: [
                    { sender: username },
                    { receiver: username }
                  ]
                }
              },
              // Stage 2: Add field to identify the other party
              {
                $addFields: {
                  otherParty: {
                    $cond: {
                      if: { $eq: ["$sender", username] },
                      then: "$receiver",
                      else: "$sender"
                    }
                  }
                }
              },
              // Stage 3: Sort messages by timestamp descending
              {
                $sort: {
                  timestamp: -1
                }
              },
              // Stage 4: Group by otherParty to get latest message
              {
                $group: {
                  _id: "$otherParty",
                  latestMessage: { $first: "$content" },
                  timestamp: { $first: "$timestamp" }
                }
              },
              // Stage 5: Lookup user details
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "username",
                  as: "userDetails"
                }
              },
              // Stage 6: Unwind userDetails
              {
                $unwind: "$userDetails"
              },
              // Stage 7: Lookup match status
                    // Stage 7: Lookup match status
              {
                $lookup: {
                  from: "matches",
                  let: { otherParty: "$_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $or: [
                            {
                              $and: [
                                { $eq: ["$sender", username] },
                                { $eq: ["$receiver", "$$otherParty"] }
                              ]
                            },
                            {
                              $and: [
                                { $eq: ["$sender", "$$otherParty"] },
                                { $eq: ["$receiver", username] }
                              ]
                            }
                          ]
                        }
                      }
                    }
                  ],
                  as: "matchInfo"
                }
              },
              // Stage 8: Filter only matched users
              {
                $match: {
                  "matchInfo.0": { $exists: true }
                }
              },

              // Stage 9: Project final fields
              {
                $project: {
                  _id: 0,
                  username: "$userDetails.username",
                  firstname: "$userDetails.profileInfo.firstname",
                  lastname: "$userDetails.profileInfo.lastname",
                  profilePic: {
                    $let: {
                      vars: {
                        profileImage: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$userDetails.profileInfo.imageGallery",
                                as: "img",
                                cond: { $eq: ["$$img.imgid", 1] }
                              }
                            },
                            0
                          ]
                        }
                      },
                      in: {
                        $ifNull: ["$$profileImage.url", null]
                      }
                    }
                  },
                  latestMessage: "$latestMessage"
                }
              }
            ]
          
          );


          return result;
      

        } catch (e) {
          console.log("e.message", e.message);
          throw new Error("Can't get the inbox");
        }
      },

      getMessages: async (parent, args, { req, res, auth }) => {

        try {
          console.log("args",args)
          // Verify user from access token
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          const { username, pageNo } = args;

          // Validate page number
          const page = parseInt(pageNo, 10);
          if (isNaN(page) || page < 1) throw new Error("INVALID_PAGE_NUMBER");
      
          // Fetch sender and receiver users
          const users = await UserModel.find({ $or: [{ _id }, { username }] });
          if (users.length < 2) throw new Error("INVALID_REQUEST_CONVO");
      
          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.username === username);
      
          if (!sender || !receiver || sender.username === receiver.username) {
            throw new Error("INVALID_REQUEST_YYYYZ");
          }
      
          const limit = 20; // Messages per page
          const skip = (page - 1) * limit;
          

          // Aggregation pipeline with $lookup
          const results = await MessageModel.aggregate([
            // Lookup for blocked users
            {
              $lookup: {
                from: "blocks", // Collection name of BlockModel
                let: { senderUser: sender.username, receiverUser: receiver.username },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          { $and: [{ $eq: ["$sender", "$$senderUser"] }, { $eq: ["$receiver", "$$receiverUser"] }] },
                          { $and: [{ $eq: ["$sender", "$$receiverUser"] }, { $eq: ["$receiver", "$$senderUser"] }] }
                        ]
                      }
                    }
                  }
                ],
                as: "blocked",
              },
            },
            // Lookup for matched users
            {
              $lookup: {
                from: "matches", // Collection name of MatchModel
                let: { senderUser: sender.username, receiverUser: receiver.username },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          { $and: [{ $eq: ["$sender", "$$senderUser"] }, { $eq: ["$receiver", "$$receiverUser"] }] },
                          { $and: [{ $eq: ["$sender", "$$receiverUser"] }, { $eq: ["$receiver", "$$senderUser"] }] }
                        ]
                      }
                    }
                  }
                ],
                as: "matched",
              },
            },
            // Fetch messages between users with pagination
            {
              $facet: {
                messages: [
                  {
                    $match: {
                      sender: { $in: [sender.username, receiver.username] },
                      receiver: { $in: [sender.username, receiver.username] },
                    },
                  },
                  { $sort: { timestamp: -1 } },
                  { $skip: skip },
                  { $limit: limit },
                ],
                // Calculate the total number of messages for pagination
                totalMessages: [
                  {
                    $match: {
                      sender: { $in: [sender.username, receiver.username] },
                      receiver: { $in: [sender.username, receiver.username] },
                    },
                  },
                  { $count: "count" },
                ],
              },
            },
          ]);

          const [result] = results;
          const messages = result.messages;

          if(messages.length > 0){

            const matched = result.messages[0].matched;
            const blocked = result.messages[0].blocked;

            if(matched.length == 0) throw Error("NOT_MATCHED")
            if(blocked.length > 0) throw Error("BLOCKED")

          }
      
          const totalMessages = result.totalMessages[0]?.count || 0;
          const totalPages = Math.ceil(totalMessages / limit); 
          


          // Format the response
          const formattedMessages = messages.map((e) => ({
            id: e._id.toString(),
            sender: e.sender,
            receiver: e.receiver,
            content: {
              image: e.content?.image || null,
              sticker: e.content?.sticker || null,
              message: e.content?.message || null,
            },
            timestamp: formatLastSeen(e.timestamp),
          }));

          // console.log(page,"/",totalPages)

          return {
            currentPage: page,
            totalPages: totalPages,
            messages: formattedMessages,
          };
        } catch (e) {
          console.log("e.message",e.message)
          return GQLError(e.message,"can't get the messages")
        }
      
      
      },
      
      getNotifications:async(parents,args,{req, res, auth})=>{
        
        try{
        
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const user = await UserModel.findOne({ _id })

          const notificationslist = await NotificationModel.find(
            { username: user.username, }
          )
          
          let finalNotification = notificationslist.map((e)=>{

              const { 
                username,
                message, 
                type,
                timestamp
              } = e

              return {
                username: username,
                message: message,
                type: type,
                timestamp: formatLastSeen(timestamp),
              }
          })

          
          return finalNotification

        }
        catch(e){
          console.log("e.message",e.message)
          return GQLError(e.message,"can't get the notifications")
        }
      },
      
    },
    Mutation: {
      
      sendRequest: async (parents, args, { req, res, auth }) => {
        try {
          
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          const { publicUsername, type } = args;
      
          // Fetch users
          const users = await UserModel.find({ $or: [{ _id }, { publicUsername }] });
          if (users.length < 2) throw new Error("INVALID_REQUEST");
      
          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.publicUsername === publicUsername);
          
          if (!sender || !receiver || sender.username === receiver.username) {
            throw new Error("INVALID_REQUEST");
          }
      
          // Check if sender is blocked by receiver
          const blockedBySender = await BlockModel.findOne({
            sender: receiver.username,
            receiver: sender.username,
          });

          if (blockedBySender) throw Error("YOURE_BLOCKED");
      
          if (type === "BLOCK") {
            // Delete any existing matches before blocking
            const deleteResult = await FollowModel.deleteMany({
              $or: [
                { sender: sender.username, receiver: receiver.username },
              ],
            });
      
            if (deleteResult.deletedCount > 0) {
              // Perform block if matches were deleted
              const blockReq = await BlockModel.findOneAndUpdate(
                { sender: sender.username, receiver: receiver.username },
                { sender: sender.username, receiver: receiver.username }, 
                // Update fields if necessary
                { upsert: true, new: true } 
                // Upsert to ensure the block is created if it does not exist
              );
      
              if (!blockReq) throw Error("FAILED_TO_BLOCK");
      
              return "block successful";
            } 
            else {
              throw new Error("NO_FOLLOW_FOUND_TO_BLOCK");
            }
          } 
          else if(type === "FOLLOW"){

            const followReq = await FollowModel.findOneAndUpdate(
              { sender: sender.username, receiver: receiver.username },
              { sender: sender.username, receiver: receiver.username }, 
              // Update fields if necessary
              { upsert: true, new: true } 
              // Upsert to ensure the block is created if it does not exist
            );

            if (!followReq) throw Error("FAILED_TO_FOLLOW");

          }
          else if(type === "UNFOLLOW"){
            
            const unfollow = await FollowModel.deleteMany({
              $or: [
                { sender: sender.username, receiver: receiver.username },
              ],
            });

            if (!unfollow) throw Error("FAILED_TO_UNFOLLOW");

          }
          else {
            throw new Error("INVALID_REQ_TYPE");
          }
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "request send failed");
        }
      },

      sendVote: async (parents, args, { req, res, auth }) => {
        try {
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          const { 
            type, postId, commentId, upvote
          } = args.voteInput;
      
          let username = null

          if(type == "POST"){

            const postfind = await PostModel.findOne({ postId })
            username = postfind.personUsername
          }

          if(type == "COMMENT"){

            const comment = await CommentModel.findOne({ commentId })
            username = comment.personUsername

          }

          // Fetch users
          const users = await UserModel.find({ $or: [{ _id }, { username }] });
          if (users.length < 2) throw new Error("INVALID_REQUEST");
      
          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.username === username);
          if (!sender || !receiver || sender.username === receiver.username) {
            throw new Error("INVALID_REQUEST");
          }
      
          // Check if sender is blocked by receiver
          const blockedBySender = await BlockModel.findOne({
            sender: receiver.username,
            receiver: sender.username,
          });

          if (blockedBySender) throw Error("YOURE_BLOCKED");

          if(type == "POST"){

            const votePost = await VoteModel.findOneAndUpdate(
              { personUsername: sender.username, type: "POST", postId },
              { personUsername: sender.username, type: "POST", postId, upvote:upvote },
              { upsert: true, new: true } 
            )

            if(votePost){

              const post = await PostModel.updateOne(
                { postId },
                { 
                  $inc: {
                    upvoteCount: (upvote)?1:0,  
                    downvoteCount: (!upvote)?1:0 
                  }
                }
              )

              if(!post){ throw Error("FAILED_TO_SEND_VOTE")}
              return "success"

            }

          }

          if(type == "COMMENT"){
            const voteComment = await VoteModel.findOneAndUpdate(
              { personUsername: sender.username, type: "COMMENT", commentId },
              { personUsername: sender.username, type: "COMMENT", commentId, upvote:upvote },
              { upsert: true, new: true } 
            )

            if(voteComment){
              const comment = await PostModel.updateOne(
                { postId },
                { 
                  $inc: {
                    upvoteCount: (upvote)?1:0,  
                    downvoteCount: (!upvote)?1:0 
                  }
                }
              )

              if(!comment){ throw Error("FAILED_TO_SEND_VOTE")}
              return "success"
            }

          }
          
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "request send failed");
        }
      },

      addPost: async (parents, args, { req, res, auth }) => {
        
        try {

          const { _id } = auth.verifyToken("ACCESS_TOKEN_BEARER", null, req);
          const user = await UserModel.findOne({ _id });
          if (!user) throw new Error("User not found.");

          const { 
            postId, 
            title, content, 
            operation
          } = args.postInput;


          if(operation == "ADD" || operation == "UPDATE"){

            const post = await PostModel.findOneAndUpdate(
              { _id: postId },
              { 
                title:title,
                "content.text":content.text,
                "content.image":content.image
              },
              { upsert: true, new: true } 
            )

            if(!post) { throw Error("POST_"+operation+"_FAILED") }
           
            return "post successful"
          }
          
          if(operation == "DELETE"){

            const deleteMany = await PostModel.deleteMany({ _id: postId })
            if(!deleteMany) { throw Error("POST_DELETE_FAILED")}

            return "post deleted successfully"

          }
      
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "post operation failed");
        }

      },

      addComment: async (parents, args, { req, res, auth }) => {
        
        try {

          const { _id } = auth.verifyToken("ACCESS_TOKEN_BEARER", null, req);
          const user = await UserModel.findOne({ _id });
          if (!user) throw new Error("User not found.");

          const { 
            commentId, 
            title, content, 
            operation
          } = args.postInput;


          if(operation == "ADD" || operation == "UPDATE"){

            const comment = await CommentModel.findOneAndUpdate(
              { _id: commentId },
              { 
                title:title,
                "content.text":content.text,
                "content.image":content.image
              },
              { upsert: true, new: true } 
            )

            if(!comment) { throw Error("COMMENT_"+operation+"_FAILED") }
           
            return "comment successful"
          }
          
          if(operation == "DELETE"){

            const deleteMany = await CommentModel.deleteMany({ _id: commentId })
            if(!deleteMany) { throw Error("COMMENT_DELETE_FAILED")}

            return "comment deleted successfully"

          }
      
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "comment operation failed");
        }
      },

      selectConversation: async (parents, args, { req, res, auth }) => {
        try {

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);

          const user = await UserModel.findOne({ _id });
          if (!user) throw new Error("USER_NOT_FOUND");
      
          const { username, option, report } = args;
      
          if (option === "UNMATCH") {
            const { deletedCount } = await MatchModel.deleteMany({
              $or: [
                { sender: user.username, receiver: username },
                { sender: username, receiver: user.username },
              ],
            });

            if (deletedCount === 0) throw new Error("UNMATCH_FAILED");
      
            return "successfully unmatched";
          }
      
          if (option === "BLOCK") {
            const { deletedCount } = await MatchModel.deleteMany({
              $or: [
                { sender: user.username, receiver: username },
                { sender: username, receiver: user.username },
              ],
            });
      
            if (deletedCount === 0) throw new Error("UNMATCH_FAILED");
      
            const blocked = await BlockModel.updateOne(
              { sender: user.username, receiver: username },
              { $set: { report } },
              { upsert: true }
            );
      
            if (blocked.upsertedCount === 0 && blocked.matchedCount === 0) {
              throw new Error("BLOCK_FAILED");
            }
      
            return "successfully blocked";
          }
      
          return "success";

        } 
        catch (e) {
          return GQLError(e.message, "can't select the conversation");
        }
      },

      sendMessage:async(parents,args,{auth,req,res, pubSub})=>{
        
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const { username, content } = args.messageInput

          const users = await UserModel.find({ $or: [{ _id }, { username }] });
      
          if (users.length < 2) throw new Error("INVALID_REQUEST");
          
          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.username === username);

          if (!sender || !receiver || sender.username === receiver.username){
            throw new Error("INVALID_REQUEST");
          }

          const blockedbysender = await BlockModel.findOne({
            sender: receiver.username,
            receiver: sender.username,
          });
          
          if (blockedbysender) throw Error("YOURE_BLOCKED");
          
          
          if(content.message.length === 0){
            throw Error("EMPTY_MESSAGE")
          }
          

          
          const sendMessage = await MessageModel({
            sender:sender.username, 
            receiver: receiver.username,
            content: content
          }).save() 

          if(!sendMessage){ throw Error("MESSAGE_NOT_SEND") }

          const newMessage = {
            sender:sendMessage.sender,
            receiver:sendMessage.receiver,
            content:{
              message:sendMessage.content.message
            },
            timestamp:formatLastSeen(sendMessage.timestamp)
          }
          // console.log("newMessage",receiver.username)
          pubSub.publish(`NEW_MESSAGE_USER_${receiver.username}`, { NEW_MESSAGE_USER: newMessage });

          return newMessage
        }
        catch(e){
          console.log("e.message",e.message)
          return GQLError(e.message,"can't send the message")

        }
      },
      
    },

    Subscription: {
      
      newMessages:{
        
        subscribe: async(parents,args,{req, res, auth ,pubSub})=>{
          
          try {
            const { _id } = auth.verifyToken("ACCESS_TOKEN_BEARER", null, req);
            const user = await UserModel.findOne({ _id });
            if (!user) throw new Error("User not found.");
            console.log("connected ",user.username)

            return pubSub.asyncIterator(`NEW_MESSAGE_USER_${user.username}`);

          }
          catch(e){
            console.log("e",e.message)
            return GQLError(e.message,"can't get the new message")
          }

        },
        resolve: (payload) => {
          try{
            console.log("payload.NEW_MESSAGE_USER",payload.NEW_MESSAGE_USER)
            return payload.NEW_MESSAGE_USER;
          }
          catch(e){
            console.log("e",e.message)
          }
        },
      },
    
    }
}
 
module.exports = { ContentTypes, ContentResolver }
