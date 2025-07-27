const UserModel = require('../models/user')

const{ formatLastSeen } = require("../utils/utils")
const { validateSchema }  = require( "../utils/isvalid")
const { GQLError, isValidInput, } = require('./../utils/error')


const { 

  BlockModel, 
  MessageModel, NotificationModel,
  FollowModel,
  PostModel, CommentModel, VoteModel

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
    message: String
  }

  input MessageInput{ 
    username:String 
    content:MessageContentInput 
  }

  input ImageInput{
    imgid:Int url:String icon_url:String thumb_url:String
    identifiedAs:String isSafe:Boolean
  }

  type ImageType{
    imgid:Int url:String icon_url:String thumb_url:String
    identifiedAs:String isSafe:Boolean
  }

  type PostType{
    _id:String
    publicUsername: String profilePicIcon:String 
    text: String image: ImageType textAIAnalysis: String
    upvoteCount:Int downvoteCount:Int commentsCount:Int
    timestamp: String
    readerPicIcon:String 
    readerPublicUsername:String
    readerUpvoted:Boolean
    mainComment:CommentType
  }

  type CommentType{
    _id:String
    postId:String
    publicUsername:String 
    profilePicIcon:String 
    text: String
    parentCommentId:String
    readerUpvoted:Boolean
    upvoteCount:Int 
    downvoteCount:Int 
    replyCount:Int
    timestamp: String
  }

  type ContentType{ 
    post: PostType 
    comments: [CommentType]
    totalComments: Int
    currentCommentPage: Int
  }

  type PeopleType{ 
    firstname:String 
    lastname:String 
    publicUsername:String
    profilePicIcon:String 
    timestamp:String
  }

  input SearchInput{ 
    searchTerm:String 
    section:String
    username:String
    type:String 
    currentPage:Int 
  }

  type PaginatedSearchResults{
    type:String
    posts: [PostType] 
    people: [PeopleType] 
    comments: [CommentType]
    currentPage: Int 
    totalPages: Int 
    totalCount: Int
  }


  input PostInput{ postId:String text:String textAIAnalysis:String image:ImageInput }
  input CommentInput{ commentId:String parentCommentId:String postId:String text:String textAIAnalysis:String currentCommentPage:Int }
  input VoteInput{ postId:String commentId:String upvote:Boolean }

  input ContentInput{
    type:String operation:String
    postInput:PostInput 
    commentInput:CommentInput
    voteInput:VoteInput
  }

  type Query{

    getSearchResults(searchInput:SearchInput):PaginatedSearchResults
    getProfileResults(searchInput:SearchInput):PaginatedSearchResults
    
    getContent(contentInput:ContentInput):ContentType
    
    isPublicUsernameAvailable(publicUsername:String):String
    findsenders(pageNo:Int):[MessageNode]
    getMessages(username:String, pageNo:Int):PaginatedMessages
    getNotifications:[NotificationType]

  }

  type Mutation { 
    
    sendRequest(publicUsername:String, type:String):String
    addContent(contentInput:ContentInput):String
    selectConversation(username:String, option:String, report:String):String
    sendMessage(messageInput:MessageInput):MessageType
    changePublicUsername(newUsername:String):String
  
  }

  type Subscription {

    newMessages: MessageType
  
  }


`

const ContentResolver = {

    Query:{
      
      getSearchResults: async (_, args, { auth, req }) => {
        
        try{

          const { _id } = auth.verifyToken("GET_READER", null, req);
          const { type, section, currentPage, searchTerm } = args.searchInput

          const user = await UserModel.findOne({ _id })
          if(!user){ throw Error("USER_NOT_FOUND") }
          
          if(section == "feeds"){

              const page = parseInt(currentPage) || 1;
              const limit = 2;
              const skip = (page - 1) * limit;

              const basePipeline = [
                {
                  $lookup: {
                    from: 'follows',
                    let: { currentUser: user.username },
                    pipeline: [
                      {
                        $match: {
                          $expr: { $eq: ['$sender', '$$currentUser'] }
                        }
                      },
                      {
                        $project: { receiver: 1, _id: 0 }
                      }
                    ],
                    as: 'followingList'
                  }
                },
                {
                  $addFields: {
                    followingUsernames: {
                      $map: {
                        input: '$followingList',
                        as: 'f',
                        in: '$$f.receiver'
                      }
                    }
                  }
                },
                {
                  $match: {
                    $expr: {
                      $in: ['$personUsername', '$followingUsernames']
                    }
                  }
                },
                { $sort: { timestamp: -1 } },
                {
                  $lookup: {
                    from: 'users',
                    localField: 'personUsername',
                    foreignField: 'username',
                    as: 'userDetails'
                  }
                },
                {
                  $addFields: {
                    publicUsername: { $arrayElemAt: ['$userDetails.publicUsername', 0] },
                    profilePic: {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: {
                                  $ifNull: [
                                    { $arrayElemAt: ['$userDetails.profileInfo.imageGallery', 0] },
                                    []
                                  ]
                                },
                                as: 'img',
                                cond: { $eq: ['$$img.imgid', 1] }
                              }
                            },
                            as: 'filteredImg',
                            in: '$$filteredImg.icon_url'
                          }
                        },
                        0
                      ]
                    }
                  }
                },
                {
                  $lookup: {
                    from: 'votes',
                    let: { postId: { $toString: '$_id' }, personUsername: user.username },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ['$postId', '$$postId'] },
                              { $eq: ['$personUsername', '$$personUsername'] },
                              { $not: ['$commentId'] }
                            ]
                          }
                        }
                      },
                      { $limit: 1 }
                    ],
                    as: 'userVote'
                  }
                },
                {
                  $addFields: {
                    hasUserUpvoted: {
                      $cond: {
                        if: { $gt: [{ $size: '$userVote' }, 0] },
                        then: { $arrayElemAt: ['$userVote.upvote', 0] },
                        else: null
                      }
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    content: 1,
                    publicUsername: 1,
                    timestamp: 1,
                    upvoteCount: 1,
                    commentsCount: 1,
                    downvoteCount: 1,
                    profilePic: 1,
                    hasUserUpvoted: 1,
                  }
                }
              ];

              const countPipeline = [ ...basePipeline, { $count: 'total' }];
              const countResult = await PostModel.aggregate(countPipeline);
              const totalCount = countResult[0]?.total || 0;
              const totalPages = Math.ceil(totalCount / limit);

              const paginatedPipeline = [...basePipeline, { $skip: skip }, { $limit: limit }];
              const postlist = await PostModel.aggregate(paginatedPipeline);

              const allposts = postlist.map((it) => {
                const {
                  _id,
                  publicUsername,
                  profilePic,
                  upvoteCount,
                  commentsCount,
                  downvoteCount,
                  timestamp,
                  content,
                  hasUserUpvoted
                } = it;

                let readerPublicUsername = user.publicUsername;
                let readerPicIcon = user.profileInfo.imageGallery.find(it => it.imgid === 1)?.icon_url || null;

                return {
                  _id: _id.toString(),
                  publicUsername,
                  profilePicIcon: profilePic,
                  upvoteCount,
                  downvoteCount,
                  commentsCount,
                  timestamp: formatLastSeen(timestamp),
                  text: content?.text || null,
                  textAIAnalysis: content?.textAIAnalysis || null,
                  image: content?.image || null,
                  readerPicIcon, readerPublicUsername,
                  readerUpvoted: hasUserUpvoted
                };
              });

              const result = {
                posts: allposts,
                currentPage: page,
                totalPages,
                totalCount,
                type
              };

              console.log("result: ",result)

              return result;
          
          }

          if(section == "search"){

            if(type == "content"){

              const totalCount = await PostModel.countDocuments({ });
          
              const page = currentPage + 1 - 1 - 1; 
              const limit = 2; 
              const skip = (page - 1 + 1) * limit; 
              
              const totalPages = Math.ceil(totalCount/limit); 
              
              const postlist = await PostModel.aggregate([
                {
                    $match: {}
                },
                {
                  $sort:{downvoteCount:1}
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'personUsername',
                        foreignField: 'username',
                        as: 'userDetails'
                    }
                },
                {
                    $addFields: {
                        publicUsername: { $arrayElemAt: ['$userDetails.publicUsername', 0] },
                        profilePic: {
                            $arrayElemAt: [
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: { $ifNull: [{ $arrayElemAt: ['$userDetails.profileInfo.imageGallery', 0] }, []] },
                                                as: 'img',
                                                cond: { $eq: ['$$img.imgid', 1] }
                                            }
                                        },
                                        as: 'filteredImg',
                                        in: '$$filteredImg.icon_url'
                                    }
                                },
                                0
                            ]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'votes',
                        let: { postId: { $toString: '$_id' }, personUsername: user.username }, // Convert _id to string for matching
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$postId', '$$postId'] },
                                            { $eq: ['$personUsername', '$$personUsername'] },
                                            { $not: ['$commentId'] }
                                        ]
                                    }
                                }
                            },
                            {
                                $limit: 1
                            }
                        ],
                        as: 'userVote'
                    }
                },
                {
                    $addFields: {
                        hasUserUpvoted: {
                            $cond: {
                                if: { $gt: [{ $size: '$userVote' }, 0] },
                                then: { $arrayElemAt: ['$userVote.upvote', 0] },
                                else: null
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        publicUsername: 1,
                        timestamp: 1,
                        upvoteCount: 1,
                        commentsCount: 1,
                        downvoteCount: 1,
                        profilePic: 1,
                        hasUserUpvoted: 1,
                    }
                },
                { $skip: skip },
                { $limit: limit }
              ]);
          
              const allposts = postlist.map((it) => {
                const {
                  _id,
                  publicUsername,
                  profilePic,
                  upvoteCount,
                  commentsCount,
                  downvoteCount,
                  timestamp,
                  content,
                  hasUserUpvoted
                } = it;
          
                let readerPublicUsername = user.publicUsername
                let readerPicIcon = user.profileInfo.imageGallery.find(it=>it.imgid === 1).icon_url
          
                return {
                  _id: _id.toString(),
                  publicUsername,
                  profilePicIcon:profilePic,
                  upvoteCount,
                  downvoteCount,
                  commentsCount,
                  timestamp:formatLastSeen(timestamp),
                  text: content?.text || null,
                  textAIAnalysis: content?.textAIAnalysis || null,
                  image: content?.image || null,
                  readerPicIcon, 
                  readerPublicUsername,
                  readerUpvoted:hasUserUpvoted
                };
              });
          
              const result = {
                posts: allposts, 
                currentPage, totalPages, 
                totalCount, type
              }
          
              
              return result
          
            }

            if(type == "people"){

            const page = currentPage + 1 -1 - 1; 
            const limit = 2; 
            const skip = (page - 1 + 1) * limit; 

            const matchFilter = searchTerm
              ? {
                  publicUsername: { $regex: searchTerm, $options: "i" }, 
                }
              : {}; 

            console.log("matchfilter",matchFilter)
              
            const totalCount = await UserModel.aggregate([
              { $match: matchFilter },
              { $count: "total" },
            ]);

            const total = totalCount[0]?.total || 0;

            const userlist = await UserModel.aggregate([
              { $match: matchFilter },
              { $sort:{ followersCount:-1 } },
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  publicUsername: 1,
                  "profileInfo.firstname": 1,
                  "profileInfo.lastname": 1,
                  profilePic: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: {
                            $filter: {
                              input: "$profileInfo.imageGallery", 
                              as: "img",
                              cond: { $eq: ["$$img.imgid", 1] },
                            },
                          },
                          as: "filteredImg",
                          in: "$$filteredImg.icon_url",
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            ]);


            const totalPages = Math.ceil(total / limit);

            const allusers = userlist.map((item, j)=>{

              const { profileInfo, publicUsername, profilePic } = item
              const {
                firstname, lastname, 
              } = profileInfo

              return {
                publicUsername,
                firstname, lastname,
                profilePicIcon:profilePic
              }



            })
            
            const result = {
              people: allusers,
              currentPage, 
              totalPages,
              totalCount:total, 
            }

            return result



            }

          }

        }
        catch(e){
  
          console.log(e.message)  
          return GQLError("RECOMM_ERROR","Unable to recommend")
          
        }
      },
      
      getProfileResults: async (_, args, { auth, req }) => {
        
        try{

          const { _id } = auth.verifyToken("GET_READER", null, req);
          const { type, currentPage, username, searchTerm } = args.searchInput

          const user = await UserModel.findOne({ _id })
          if(!user){ throw Error("USER_NOT_FOUND") }

          if(type == "posts"){
          
            const user2 = await UserModel.findOne({ _id })

            const matchFilter =  {
              personUsername: user2.username
            }

            const totalCount1 = await PostModel.aggregate([
              { $match: matchFilter },
              { $count: "total" },
            ]);


            const totalCount = totalCount1[0]?.total || 0;

            const page = currentPage + 1 - 1 - 1;
            const limit = 2;
            const skip = (page - 1 + 1) * limit;

            const totalPages = Math.ceil(totalCount / limit);
            
            const postlist = await PostModel.aggregate([
              {
                $match: matchFilter
              },
              {
                $sort:{ timestamp:-1 }, 
              },
              {
                  $lookup: {
                      from: 'users',
                      localField: 'personUsername',
                      foreignField: 'username',
                      as: 'userDetails'
                  }
              },
              {
                  $addFields: {
                      publicUsername: { $arrayElemAt: ['$userDetails.publicUsername', 0] },
                      profilePic: {
                          $arrayElemAt: [
                              {
                                  $map: {
                                      input: {
                                          $filter: {
                                              input: { $ifNull: [{ $arrayElemAt: ['$userDetails.profileInfo.imageGallery', 0] }, []] },
                                              as: 'img',
                                              cond: { $eq: ['$$img.imgid', 1] }
                                          }
                                      },
                                      as: 'filteredImg',
                                      in: '$$filteredImg.icon_url'
                                  }
                              },
                              0
                          ]
                      }
                  }
              },
              {
                  $lookup: {
                      from: 'votes',
                      let: { postId: { $toString: '$_id' }, personUsername: user.username }, 
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ['$postId', '$$postId'] },
                                          { $eq: ['$personUsername', '$$personUsername'] },
                                          { $not: ['$commentId'] }
                                      ]
                                  }
                              }
                          },
                          {
                              $limit: 1
                          }
                      ],
                      as: 'userVote'
                  }
              },
              {
                  $addFields: {
                      hasUserUpvoted: {
                          $cond: {
                              if: { $gt: [{ $size: '$userVote' }, 0] },
                              then: { $arrayElemAt: ['$userVote.upvote', 0] },
                              else: null
                          }
                      }
                  }
              },
              {
                  $project: {
                      _id: 1,
                      content: 1,
                      publicUsername: 1,
                      timestamp: 1,
                      upvoteCount: 1,
                      commentsCount: 1,
                      downvoteCount: 1,
                      profilePic: 1,
                      hasUserUpvoted: 1,
                  }
              },
              { $skip: skip },
              { $limit: limit }
            ]);
        
            const allposts = postlist.map((it) => {

              const {
                _id,
                publicUsername,
                profilePic,
                upvoteCount,
                commentsCount,
                downvoteCount,
                timestamp,
                content,
                hasUserUpvoted
              } = it;
        
              let readerPublicUsername = user.publicUsername
              let readerPicIcon = user.profileInfo.imageGallery.find(it=>it.imgid === 1).icon_url
        
              return {
                _id: _id.toString(),
                publicUsername,
                profilePicIcon:profilePic,
                upvoteCount,
                downvoteCount,
                commentsCount,
                timestamp:formatLastSeen(timestamp),
                text: content?.text || null,
                textAIAnalysis: content?.textAIAnalysis || null,
                image: content?.image || null,
                readerPicIcon, 
                readerPublicUsername,
                readerUpvoted:hasUserUpvoted
              };
            });
        
            const result = {
              posts: allposts, 
              currentPage, totalPages, 
              totalCount, type
            }
        
            
            return result
        
          }

          if(type == "comments"){

            const user2 = await UserModel.findOne({ _id })

            const matchFilter =  {
              personUsername: user2.username
            }

            const totalCount1 = await CommentModel.aggregate([
              { $match: matchFilter },
              { $count: "total" },
            ]);

            const totalCount = totalCount1[0]?.total || 0;
        
            const page = currentPage + 1 - 1 - 1; 
            const limit = 2; 
            const skip = (page - 1 + 1) * limit; 
            
            const totalPages = Math.ceil(totalCount/limit); 
            
            const commentslist = await CommentModel.aggregate([
              {
                  $match: matchFilter
              },
              {
                $sort:{ timestamp:-1 }, 
              },
              {
                  $lookup: {
                      from: 'users',
                      localField: 'personUsername',
                      foreignField: 'username',
                      as: 'userDetails'
                  }
              },
              {
                  $addFields: {
                      publicUsername: { $arrayElemAt: ['$userDetails.publicUsername', 0] },
                      profilePic: {
                          $arrayElemAt: [
                              {
                                  $map: {
                                      input: {
                                          $filter: {
                                              input: { $ifNull: [{ $arrayElemAt: ['$userDetails.profileInfo.imageGallery', 0] }, []] },
                                              as: 'img',
                                              cond: { $eq: ['$$img.imgid', 1] }
                                          }
                                      },
                                      as: 'filteredImg',
                                      in: '$$filteredImg.icon_url'
                                  }
                              },
                              0
                          ]
                      }
                  }
              },
              {
                  $lookup: {
                      from: 'votes',
                      let: { commentId: { $toString: '$_id' }, personUsername: user.username }, // Convert _id to string for matching
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ['$commentId', '$$commentId'] },
                                          { $eq: ['$personUsername', '$$personUsername'] },
                                          { $not: ['$postId'] }
                                      ]
                                  }
                              }
                          },
                          {
                              $limit: 1
                          }
                      ],
                      as: 'userVote'
                  }
              },
              {
                  $addFields: {
                      hasUserUpvoted: {
                          $cond: {
                              if: { $gt: [{ $size: '$userVote' }, 0] },
                              then: { $arrayElemAt: ['$userVote.upvote', 0] },
                              else: null
                          }
                      }
                  }
              },
              {
                  $project: {
                      _id: 1,
                      content: 1,
                      publicUsername: 1,
                      timestamp: 1,
                      postId:1,
                      upvoteCount: 1,
                      commentContent:1,
                      commentsCount: 1,
                      downvoteCount: 1,
                      replyCount: 1,
                      profilePic: 1,
                      hasUserUpvoted: 1,
                  }
              },
              { $skip: skip },
              { $limit: limit }
            ]);


            const allcomments = commentslist.map(comment => ({
              _id: comment._id.toString(),
              profilePicIcon: comment.profilePic,
              postId: comment.postId.toString(),
              publicUsername: comment.publicUsername,
              text: comment.commentContent.text,
              upvoteCount: comment.upvoteCount,
              downvoteCount: comment.downvoteCount,
              replyCount: comment.replyCount,
              timestamp: formatLastSeen(comment.timestamp),
              readerUpvoted: comment.hasUserUpvoted
            }));


            const result = {
              comments: allcomments,
              currentPage, totalPages, 
              totalCount, type
            }
        
            
            return result
        
          }

          if(type == "following"){

          const page = currentPage + 1 -1 - 1; 
          const limit = 2; 
          const skip = (page - 1 + 1) * limit; 

          const matchFilter =  {
              sender: user.username
          }
            
          const totalCount = await FollowModel.aggregate([
            { $match: matchFilter },
            { $count: "total" },
          ]);

          const total = totalCount[0]?.total || 0;

          const followlist = await FollowModel.aggregate([
            { $match: matchFilter }, 
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "users", 
                localField: "receiver", 
                foreignField: "username", 
                as: "followerData",
              },
            },
            { $unwind: "$followerData" }, 
            {
              $project: {
                _id: 0,
                publicUsername: "$followerData.publicUsername",
                "profileInfo.firstname": "$followerData.profileInfo.firstname",
                "profileInfo.lastname": "$followerData.profileInfo.lastname",
                profilePic: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: "$followerData.profileInfo.imageGallery", 
                            as: "img",
                            cond: { $eq: ["$$img.imgid", 1] },
                          },
                        },
                        as: "filteredImg",
                        in: "$$filteredImg.icon_url",
                      },
                    },
                    0,
                  ],
                },
              },
            },
          ]);

          const totalPages = Math.ceil(total / limit);

          const allusers = followlist.map((item, j)=>{

            const { profileInfo, publicUsername, profilePic } = item
            const {
              firstname, lastname, 
            } = profileInfo

            return {
              publicUsername,
              firstname, lastname,
              profilePicIcon:profilePic
            }


          })
          
          const result = {
            people: allusers,
            currentPage, totalPages,
            totalCount:total, 
          }

          return result



          }

          if (type === "followers") {
            
            const page = Math.max(1, currentPage);
            const limit = 2;
            const skip = (page - 1) * limit;

            const matchFilter = {
              receiver: user.username, 
            };


            const totalCount = await FollowModel.aggregate([
              { $match: matchFilter },
              { $count: "total" },
            ]);

            const total = totalCount[0]?.total || 0;

            const followerList = await FollowModel.aggregate([
              { $match: matchFilter },
              { $skip: skip },
              { $limit: limit },
              {
                $lookup: {
                  from: "users", 
                  localField: "sender",
                  foreignField: "username",
                  as: "followerUser",
                },
              },
              { $unwind: "$followerUser" },
              {
                $project: {
                  publicUsername: "$followerUser.publicUsername",
                  "profileInfo.firstname": "$followerUser.profileInfo.firstname",
                  "profileInfo.lastname": "$followerUser.profileInfo.lastname",
                  profilePic: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: {
                            $filter: {
                              input: "$followerUser.profileInfo.imageGallery",
                              as: "img",
                              cond: { $eq: ["$$img.imgid", 1] },
                            },
                          },
                          as: "filteredImg",
                          in: "$$filteredImg.icon_url",
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            ]);

            const totalPages = Math.ceil(total / limit);

            const allusers = followerList.map((item) => {
              const { profileInfo, publicUsername, profilePic } = item;
              const { firstname, lastname } = profileInfo;

              return {
                publicUsername,
                firstname,
                lastname,
                profilePicIcon: profilePic,
              };
            });

            return {
              people: allusers,
              currentPage: page,
              totalPages,
              totalCount: total,
            };
          }

          if (type === "blocked") {
              
              const page = Math.max(1, currentPage); 
              const limit = 2;
              const skip = (page - 1) * limit;

              const matchFilter = {
                sender: user.username, 
              };


              const totalCount = await BlockModel.aggregate([
                { $match: matchFilter },
                { $count: "total" },
              ]);

              const total = totalCount[0]?.total || 0;

              const blocklist = await BlockModel.aggregate([
                { $match: matchFilter },
                { $skip: skip },
                { $limit: limit },
                {
                  $lookup: {
                    from: "users", 
                    localField: "receiver", 
                    foreignField: "username", 
                    as: "blockedUser",
                  },
                },
                { $unwind: "$blockedUser" },
                {
                  $project: {
                    publicUsername: "$blockedUser.publicUsername",
                    "profileInfo.firstname": "$blockedUser.profileInfo.firstname",
                    "profileInfo.lastname": "$blockedUser.profileInfo.lastname",
                    profilePic: {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: "$blockedUser.profileInfo.imageGallery",
                                as: "img",
                                cond: { $eq: ["$$img.imgid", 1] },
                              },
                            },
                            as: "filteredImg",
                            in: "$$filteredImg.icon_url",
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
              ]);

              const totalPages = Math.ceil(total / limit);

              const allusers = blocklist.map((item) => {
                const { profileInfo, publicUsername, profilePic } = item;
                const { firstname, lastname } = profileInfo;

                return {
                  publicUsername,
                  firstname,
                  lastname,
                  profilePicIcon: profilePic,
                };
              });

              const result = {
                people: allusers,
                currentPage: page,
                totalPages,
                totalCount: total,
              };

              return result;

          }

        }
        catch(e){

          console.log(e.message)
          return GQLError("RECOMM_ERROR","Unable to recommend")

        }
      },
      
      getContent: async (parents, args, { req, res, auth }) => {
        
        try {

          const { type, operation, } = args.contentInput

          if(type == "POST"){

            const { postInput, } = args.contentInput
            const { postId } = postInput
  
            if(operation == "ADD"){
              
              const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);

              const user = await UserModel.findOne({ _id }, { username: 1, publicUsername:1 });      
              if (!user) { throw new Error("User not found"); }

              const editPostView = await PostModel.findOne({ 
                personUsername:user.username, _id: postId 
              })

              if(!editPostView){ throw Error("POST_NOT_FOUND") }
    
              if(editPostView){
    
                return {
                  post:{
                    publicUsername: user.publicUsername,
                    text: editPostView.content.text,
                    textAIAnalysis: editPostView.content.textAIAnalysis,
                    image: editPostView.content.image,
                    timestamp: formatLastSeen(editPostView.timestamp)
                  }
                }
    
              }
    
            }

            if(operation == "VIEW"){

              const postView = await PostModel.findOne({ _id: postId, status:"LIVE" })
              
              if(postView){
                
                const { _id } = auth.verifyToken("GET_READER", null, req);

                const users = await UserModel.find({ $or: [{ _id }, { username:postView.personUsername }] });

                const readerUser = users.find((user) => user._id.toString() === _id);
                const postCreatorUser = users.find((user) => user.username === postView.personUsername);

                const postCreatorUserPicIcon = postCreatorUser.profileInfo.imageGallery.find(it=>it.imgid === 1)
                let readerUserPicIcon = null
                let isVoted = null

                let resultPost = {
                  publicUsername: postCreatorUser.publicUsername,
                  profilePicIcon: null,
                  text: postView.content.text,
                  textAIAnalysis: postView.content.textAIAnalysis,
                  image: postView.content.image,
                  timestamp: formatLastSeen(postView.timestamp),
                  upvoteCount:postView.upvoteCount, 
                  downvoteCount:postView.downvoteCount,
                  commentsCount:postView.commentsCount
                }

                if(readerUser){

                  readerUserPicIcon = readerUser.profileInfo.imageGallery.find(it=>it.imgid === 1).icon_url
                  
                  isVoted = await VoteModel.findOne({ postId, personUsername:readerUser.username, commentId:{$exists:false} })

                  resultPost.readerPicIcon = readerUserPicIcon
                  resultPost.readerPublicUsername = readerUser.publicUsername

                  if(isVoted){
                  
                  resultPost.readerUpvoted = isVoted.upvote
                  
                  }

                }

                return {
                  post:resultPost
                }
    
              }




            }

          }

          if(type == "COMMENTS"){

            const { commentInput, } = args.contentInput
            const { postId, commentId, parentCommentId } = commentInput

            console.log("args.contentInput : ",args.contentInput)

            if(operation == "VIEW"){

              const postView = await PostModel.findOne({ _id: postId, status:"LIVE" })

              if(postView){
                              
                const { _id } = auth.verifyToken("GET_READER", null, req);

                const users = await UserModel.find({ $or: [{ _id }, { username:postView.personUsername }] });

                const readerUser = users.find((user) => user._id.toString() === _id);
                const postCreatorUser = users.find((user) => user.username === postView.personUsername);
  
                if(commentId){

                  if(parentCommentId){

                  }
                  else{

                  }

                  const user2 = await UserModel.findOne({ _id })

            const matchFilter =  {
              personUsername: user2.username
            }

            const totalCount1 = await CommentModel.aggregate([
              { $match: matchFilter },
              { $count: "total" },
            ]);

            const totalCount = totalCount1[0]?.total || 0;
        
            const page = currentPage + 1 - 1 - 1; 
            const limit = 2; 
            const skip = (page - 1 + 1) * limit; 
            
            const totalPages = Math.ceil(totalCount/limit); 
            
            const commentslist = await CommentModel.aggregate([
              {
                  $match: matchFilter
              },
              {
                $sort:{ timestamp:-1 }, 
              },
              {
                  $lookup: {
                      from: 'users',
                      localField: 'personUsername',
                      foreignField: 'username',
                      as: 'userDetails'
                  }
              },
              {
                  $addFields: {
                      publicUsername: { $arrayElemAt: ['$userDetails.publicUsername', 0] },
                      profilePic: {
                          $arrayElemAt: [
                              {
                                  $map: {
                                      input: {
                                          $filter: {
                                              input: { $ifNull: [{ $arrayElemAt: ['$userDetails.profileInfo.imageGallery', 0] }, []] },
                                              as: 'img',
                                              cond: { $eq: ['$$img.imgid', 1] }
                                          }
                                      },
                                      as: 'filteredImg',
                                      in: '$$filteredImg.icon_url'
                                  }
                              },
                              0
                          ]
                      }
                  }
              },
              {
                  $lookup: {
                      from: 'votes',
                      let: { commentId: { $toString: '$_id' }, personUsername: user.username }, // Convert _id to string for matching
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ['$commentId', '$$commentId'] },
                                          { $eq: ['$personUsername', '$$personUsername'] },
                                          { $not: ['$postId'] }
                                      ]
                                  }
                              }
                          },
                          {
                              $limit: 1
                          }
                      ],
                      as: 'userVote'
                  }
              },
              {
                  $addFields: {
                      hasUserUpvoted: {
                          $cond: {
                              if: { $gt: [{ $size: '$userVote' }, 0] },
                              then: { $arrayElemAt: ['$userVote.upvote', 0] },
                              else: null
                          }
                      }
                  }
              },
              {
                  $project: {
                      _id: 1,
                      content: 1,
                      publicUsername: 1,
                      timestamp: 1,
                      postId:1,
                      upvoteCount: 1,
                      commentContent:1,
                      commentsCount: 1,
                      downvoteCount: 1,
                      replyCount: 1,
                      profilePic: 1,
                      hasUserUpvoted: 1,
                  }
              },
              { $skip: skip },
              { $limit: limit }
            ]);


            const allcomments = commentslist.map(comment => ({
              _id: comment._id.toString(),
              profilePicIcon: comment.profilePic,
              postId: comment.postId.toString(),
              publicUsername: comment.publicUsername,
              text: comment.commentContent.text,
              upvoteCount: comment.upvoteCount,
              downvoteCount: comment.downvoteCount,
              replyCount: comment.replyCount,
              timestamp: formatLastSeen(comment.timestamp),
              readerUpvoted: comment.hasUserUpvoted
            }));


            const result = {
              comments: allcomments,
              currentPage, totalPages, 
              totalCount, type
            }
        


                }
                else{


                }
              
              
              }
            }
          }
        }
        catch(e){
           console.log(e.message)
          return GQLError("CONTENT_ERROR","No Content Found")

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
      
      isPublicUsernameAvailable: async(parents,args,{req, res, auth})=>{
        
        try{

          const { publicUsername } = args

          isValidInput(validateSchema.isUsernameVaild, { username:publicUsername })

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const users = await UserModel.find({ $or:[ {_id}, {publicUsername} ]  })
          
          const u1 = users.find((user) => user._id.toString() === _id);
          const u2 = users.find((user) => user.publicUsername === publicUsername);

          if(u1){

            if(u2){

              if(u1.publicUsername == u2.publicUsername){
                throw Error("CURRENT_USERNAME")
              }
  
            }

          }
  
          return "username available"

        }
        catch(e){
          
          if(e.message == 'INVALID_INPUT' ){
            return GQLError(e.message,"username not valid")
          }
          if(e.message == 'CURRENT_USERNAME' ){
            return GQLError(e.message,"current username")
          }
          
          return GQLError(e.message,"username not found")
        }
      },

    },
    Mutation: {
      
      sendRequest: async (parents, args, { req, res, auth }) => {
        try {
          
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          const { publicUsername, type } = args;
      
          const users = await UserModel.find({ $or: [{ _id }, { publicUsername }] });
          if (users.length < 2) throw new Error("INVALID_REQUEST");

          const sender = users.find((user) => user._id.toString() === _id);
          const receiver = users.find((user) => user.publicUsername === publicUsername);
          
          if (!sender || !receiver || sender.username === receiver.username) {
            throw new Error("INVALID_REQUEST");
          }
      
          const blockedBySender = await BlockModel.findOne({
            sender: receiver.username, receiver: sender.username,
          });

          if (blockedBySender) throw Error("YOURE_BLOCKED");
      
          if (type === "BLOCK") {

            const blockReq = await BlockModel.findOneAndUpdate(
              { sender: sender.username, receiver: receiver.username },
              { sender: sender.username, receiver: receiver.username }, 
              { upsert: true, new: true } 
            );
    
            if (!blockReq) throw Error("FAILED_TO_BLOCK");
    
            return "block successful";
            
          }
          else if(type === "UNBLOCK"){

            const blockReq = await BlockModel.deleteMany({
              $or: [
                { sender: sender.username, receiver: receiver.username },
              ],
            });
      
            if (!blockReq) throw Error("FAILED_TO_BLOCK");
      
            return "unblock successful";

          }
          else if(type === "FOLLOW"){

            const followReq = await FollowModel.findOneAndUpdate(
              { sender: sender.username, receiver: receiver.username },
              { sender: sender.username, receiver: receiver.username }, 
              { upsert: true, new: true } 
            );

            if (!followReq) throw Error("FAILED_TO_FOLLOW");

            return "follow successful";

          }
          else if(type === "UNFOLLOW"){
            
            const unfollow = await FollowModel.deleteMany({
              $or: [
                { sender: sender.username, receiver: receiver.username },
              ],
            });

            if (!unfollow) throw Error("FAILED_TO_UNFOLLOW");
            return "Unfollow successful";
          
          }
          else {
            throw new Error("INVALID_REQ_TYPE");
          }
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "request send failed");
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

      changePublicUsername: async (parents, args, { req, res, auth }) => {
        
        try {

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req);
          const { newUsername } = args;
          isValidInput(validateSchema.isUsernameVaild, {username:newUsername})

          const user = await UserModel.findOneAndUpdate(
            { _id },
            { 
              "publicUsername":newUsername,
            },
            { upsert: true, new: true } 
          )


          if(!user) { throw Error("CHANGE_USERNAME_FAILED") }
          console.log("user.publicUsername",user.publicUsername)

          return "change username successful"
      
        } catch (e) {
          console.error(e.message);
          return GQLError(e.message, "change username failed");
        }

      },

      addContent: async (_, args, { req, res, auth }) => {

        try{
          
          const {
              type,
          } = args.contentInput
  
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
  
          const user = await UserModel.findOne({ _id })
          if (!user) { throw Error("USER_NOT_FOUND") }


          if(type == "POST"){

            const {
              type,
              postInput,
              commentInput,
              voteInput,
              operation
            } = args.contentInput

            const {
              postId,
              text,
              image,
              textAIAnalysis
            } = postInput

            if(operation == "ADD"){

              if(!postId){
                console.log("DRAFT")
                const post = await PostModel({
                  personUsername: user.username,
                  content:{
                    text,
                    textAIAnalysis,
                    image
                  },
                  upvoteCount:0, 
                  downvoteCount:0,
                  commentsCount:0,
                  status:"DRAFT"
                }).save()

                return post._id
  
              }
              else{
                console.log("LIVE")
                const post = await PostModel.findOneAndUpdate(
                  { _id:postId, personUsername: user.username },
                  { 
                    content:{
                      text, 
                      textAIAnalysis, 
                      image
                    },
                    status:"LIVE"
                  }, 
                  { upsert: false, new: false } 
                );

                return "success"

              }
              

            }

            if(operation == "DELETE"){
              
              const post = await PostModel.findOneAndUpdate(
                { _id:postId, personUsername: user.username },
                { 
                  status:"DELETED"
                }, 
                { upsert: true, new: false } 
              );


            }

          }

          if(type == "COMMENT"){

            const {
              operation,
              commentInput,
            } = args.contentInput
            
            const { 
              postId, commentId,
              parentCommentId,
              text,
            } = commentInput

            console.log("commentInput",commentInput)
            
            if(operation == "ADD"){
              
              const comment = await CommentModel({
                personUsername: user.username, 
                postId, 
                parentCommentId:parentCommentId, 
                commentContent:{
                  text
                },
                upvoteCount:0, downvoteCount:0, 
                replyCount:0

              }).save()  
              
              console.log("comment",comment)
              
              if(parentCommentId){
                
                const updateComment = await CommentModel.findOneAndUpdate(
                  { _id:parentCommentId},
                  {
                    $inc:{replyCount:1}
                  },
                  {new:true}
                )

                console.log("updateComment",updateComment)


              }else{

                const updatePost = await PostModel.findOneAndUpdate(
                  { _id: postId},
                  {
                    $inc:{ commentsCount:1 }
                  },
                  {new:true}
                )
                console.log("updatePost",updatePost)
  


              }


            }

            if(operation == "DELETE"){

              const {
                commentInput,
              } = args.contentInput
              
              const { 
                commentId,
              } = commentInput
  
              console.log("commentInput",commentInput)

              const removeComment = await CommentModel.findOneAndDelete(
                { _id:commentId, personUsername:user.username},
              )

              console.log("removeComment22",removeComment)


              if(removeComment){

                if(removeComment.parentCommentId){

                  const deleteManyVotes = VoteModel.deleteMany({
                    commentId
                  })
                  
                  const updateParentComment = await CommentModel.findOneAndUpdate(
                    {_id:removeComment.parentCommentId},{
                      $inc:{replyCount:-1}
                    },
                    {new:true}
                  )
                  // reduce replyCount of parent

                }
                else{
                  
                  // delete all children comments

                  const deleteManyComments = await CommentModel.deleteMany(
                    { parentCommentId:removeComment._id},
                    {new:true}
                  )

                  console.log("deleteManyComments",deleteManyComments)

                  // delete all orphan votes here could be expensive,


                }

                const updatePost = await PostModel.findOneAndUpdate(
                  { _id: removeComment.postId},
                  {
                    $inc:{commentsCount:-1}
                  },
                  {new:true}
                )
  

              }


  

            }


          }

          if(type == "UPVOTE"){
            
            const { voteInput, operation } = args.contentInput
            const { postId, upvote, commentId } = voteInput

            if(operation == "ADD"){

              let match = { personUsername:user.username, postId }
              
              if(commentId){
                match.commentId = commentId
              }else{
                match.commentId = { $exists:false }
              }

              const voteAdd = await VoteModel.findOneAndUpdate(
                  match ,
                { personUsername:user.username, postId, upvote }, 
                { upsert: true, new: true }
              )

              console.log("voteAdd",voteAdd)

            }

            if(operation == "DELETE"){
              
              let match = { personUsername:user.username, postId }

              if (commentId) {
                match.commentId = commentId;
              } else {
                match.commentId = { $exists: false };
              }
              
              const voteRemove = await VoteModel.findOneAndDelete(match)
              console.log("voteRemove",voteRemove)
              
            }

            let match2 = { postId }
            
            if (commentId) {
              match2.commentId = commentId;
            }
            else {
              match2.commentId = { $exists: false };
            }

            const voteCounts = await VoteModel.aggregate([
              {
                $match:match2
              },
              {
                $group: {
                  _id: null,
                  upvoteCount: { $sum: { $cond: [{ $eq: ["$upvote", true] }, 1, 0] } },
                  downvoteCount: { $sum: { $cond: [{ $eq: ["$upvote", false] }, 1, 0] } }
                }
              }
            ]);

            console.log("voteCounts",voteCounts)


            if(voteCounts){
                
              let totalUp = 0
              let totalDown = 0

              if(voteCounts.length > 0){

                const { upvoteCount, downvoteCount } = voteCounts[0]
                
                totalUp = upvoteCount
                totalDown = downvoteCount
              
              }

              if(commentId){

                const comment = await CommentModel.findOneAndUpdate(
                  { 
                    _id:commentId
                  },
                  { 
                    upvoteCount:totalUp,
                    downvoteCount:totalDown
                  },
                  { new:true }
                )

              }
              else{

                const post = await PostModel.findOneAndUpdate(
                  { _id:postId },
                  { 
                    upvoteCount:totalUp,
                    downvoteCount:totalDown
                  },
                  { new:true }
                )

              }


            }

            return "success"

          }

        }
        catch(e){
          console.log(e.message)
          return GQLError("ADD_CONTENT_FAILED","add content failed")
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
