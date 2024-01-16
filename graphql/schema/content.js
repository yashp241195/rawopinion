const { GQLErrorFilter } = require("../utils/utils")
// const { UserModel } = require('../models/user')
// const { MatchModel, RequestModel, BlockModel, ReportModel, CommunicationModel, Big5ResponseModel, Big5QuestionModel } = require('../models/match')
// const { getDaysDifference, getLastseen } = require('../utils/utils')


const ContentTypes = `

  type ImageType{
    imgid:Int url:String icon_url:String 
    identifiedAs:String filter:String isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String sexy:String hentai:String
  }

  input ImageInput{
    imgid:Int url:String icon_url:String 
    isDelete:Boolean identifiedAs:String filter:String 
    isProfileSafe:Boolean isSafe:Boolean
    neutral:String porn:String drawing:String sexy:String hentai:String
  }

  type PostType{
    postId:String 
    postedBy:String postedByName:String
    userImage:ImageType verifiedUser:Boolean
    postTitle:String postContent:String postImage:ImageType 
    upvoteCount:Int downvoteCount:Int ContextOutCount:Int
    onBlockchain:Boolean blockchainId:String
  }

  type CommentType{
    id:String commentedby:String 
    commentContent:String commentImage:String
    upvoteCount:Int downvoteCount:Int 
    blockchain:String
  }

  type PostListType{ postId:String postTitle:String postImage:ImageType postedBy:String postStatus:String verifiedUser:Boolean onBlockchain:Boolean }
  type PersonListType{ public_username:String firstname:String lastname:String profilepic:ImageType }
  type PageListType{ pageId:String public_username:String pageTitle:String pageLogo:ImageType memberLevel:String }
  
  type SearchResultType{ postList: [PostListType] personList: [PersonListType]  pageList: [PageListType] resultType:String resultCount:Int resultPageCount:Int }
  
  type ConnectionType{ public_username:String name: String openfor: String pic:ImageType }
  type PageType{ pageId:String public_username:String pageTitle:String pageLogo:String memberType:String }
  type ActivityType{ activityStatement:String postId:String postedBy:String  postTitle:String postImage:ImageType }

  input SearchInput{ queryType:String search:String }

  input RequestInput{ username:String requestOption:String }
  input AddPostInput{ postTitle:String postContent:String postImage:String }
  input PostRequestInput{ postRequestOption:String commentContent:String commentImage:String publishToBlockchain:Boolean }
  input AddCommentInput{ commentContent:String commentImage:String }
  input CommentRequestInput{ commentRequestOption:String commentContent:String commentImage:String publishToBlockchain:Boolean }
  input AddPageInput{ public_username:String pageTitle:String pageLogo:String pageBio:String }
  input PageRequestInput{ pageRequest:String pageTitle:String pageLogo:String pageBio:String }

  
  type Query{

    getSearchResults(searchInput:SearchInput):SearchResultType

    getConnections(public_username:String, pageNo:Int):[ConnectionType]
    getActivities(public_username:String, option:String, pageNo:Int):[ActivityType]
    getPagesJoined(public_username:String):[PageListType]

    getPost(postId:String):PostType
    getPage(pageId:String):PageType
    getComments(postId:String, latestCommentId:String, maxLimit:Int):[CommentType]
  
  }

  type Mutation { 
    
    sendRequest(requestInput:RequestInput):String
    addPost(addPostInput:AddPostInput):String
    sendPostRequest(postRequestInput:PostRequestInput):String
    addComment(addCommentInput:AddCommentInput):String
    sendCommentRequest(commentRequestInput:CommentRequestInput):String
    addPage(addPageInput:AddPageInput):String
    sendPageRequest(pageRequestInput:PageRequestInput):String

  }

`

const ContentResolver = {

    Query:{

      getSearchResults:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const searchresults = {
              postList:[
                {
                  "postId":"1",
                  "postedBy":"p/climatewatch",
                  "verifiedUser":true,
                  "onBlockchain":true,
                  "postStatus":"Blockchain",
                  "postTitle":"Scientists Warn of Accelerating Ice Melt in Antarctica - 1 hr ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://eoimages.gsfc.nasa.gov/images/imagerecords/83000/83624/temperature_nca-1991-2012_lrg.jpg"
                  },
                },
                {
                  "postId":"2",
                  "postedBy":"p/greeninsights",
                  "verifiedUser":true,
                  "onBlockchain":true,
                  "postStatus":"Blockchain",
                  "postTitle":"Global Leaders Commit to Ambitious Carbon Reduction Targets - 12 hr ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://omdayal.com/wp-content/uploads/2022/05/rce-2.jpg"
                  },
                },
                {
                  "postId":"3",
                  "postedBy":"u/peter22",
                  "verifiedUser":true,
                  "onBlockchain":true,
                  "postStatus":"Blockchain",
                  "postTitle":"Locals Adopts Solar Power Initiative for Sustainable Living - 3 days ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://newsstation.media/wp-content/uploads/2023/11/F_gjgWxbcAAXBq6.jpeg"
                  },
                },
                {
                  "postId":"4",
                  "postedBy":"p/climateunited",
                  "verifiedUser":true,
                  "onBlockchain":false,
                  "postStatus":"Blockchain",
                  "postTitle":"UN Climate Summit Highlights Urgency for Global Action - 2 months ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/LXXNMZTAR5I3DMPOATNCVHP4XE.jpg"
                  },
                },
                {
                  "postId":"5",
                  "postedBy":"p/tech4climate",
                  "verifiedUser":true,
                  "onBlockchain":false,
                  "postStatus":"Blockchain",
                  "postTitle":"Innovative Technologies Tackle Carbon Emissions in Urban Areas - 1 month ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2021/11/thumb_720_450_dreamstime_xxl_62022495.jpg"
                  },
                },
                {
                  "postId":"6",
                  "postedBy":"p/naturedefenders",
                  "verifiedUser":true,
                  "onBlockchain":true,
                  "postStatus":"Blockchain",
                  "postTitle":"Protecting Biodiversity Crucial in Climate Change Mitigation - 1 week ago",
                  "activityStatement":"You have upvoted the comment 'The better option ..'.",
                  "postImage":{
                    "imgid":1,
                    "icon_url":"https://img.freepik.com/free-vector/hand-drawn-biodiversity-illustration_23-2149400543.jpg"
                  },
                },
              ],
              resultType:"POST",
              resultCount:6,
              resultPageCount:3
          }

          return searchresults

        }catch(e){
          return GQLErrorFilter(e.message,"can't get search results",null)
        }
      },
      
      getConnections:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const connectionList = [
            {
              "public_username":"kim1",
              "name":"Kim", 
              "lastname":"One",
              "openfor":"DISCUSSION",
              "pic":{
                "imgid":1,
                "icon_url":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
              },
            },
          ]

          return connectionList

        }catch(e){
          return GQLErrorFilter(e.message,"can't get connections",null)
        }
      },

      getActivities:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const activity_list = [
            {
              "postId":"1",
              "postedBy":"kim1",
              "postTitle":"Effects of climate change worsening in every part of the US, report says",
              "activityStatement":"You have upvoted the comment 'The better option ..'.",
              "postImage":{
                "imgid":1,
                "icon_url":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
              },
            },
            {
              "postId":"2",
              "postedBy":"kim2",
              "postTitle":"Effects of climate change worsening in every part of the US, report says",
              "activityStatement":"You have upvoted the comment 'The better option ..'.",
              "postImage":{
                "imgid":1,
                "icon_url":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
              },
            },
          ]

          return activity_list

        }catch(e){
          return GQLErrorFilter(e.message,"can't get activities",null)
        }
      },
      getPagesJoined:async(parents,args,{ req, res, auth })=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const pages_joined_list = [
            {
              "pageId":"pg11",
              "public_username":"page1",
              "pageTitle":"Page One",
              "pageLogo":{
                "imgid":1,
                "icon_url":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
              },
              "memberLevel":"Admin"
            },
          ]

          return pages_joined_list

        }catch(e){
          return GQLErrorFilter(e.message,"can't get pages joined",null)
        }
      },

      getPost:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const {jobId} = args


            const postDetails = {
              "postId": "abc123",
              "postedBy": "u/pater22",
              "postedByName": "Peter Harris",
              "userImage": {
                "imgid":"1",
                "icon_url": "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              "verifiedUser": true,
              "postTitle": "Locals Adopts Solar Power Initiative for Sustainable Living",
              "postContent": "Hello",
              "postImage": {
                "imgid":"1",
                "url": "https://newsstation.media/wp-content/uploads/2023/11/F_gjgWxbcAAXBq6.jpeg",
              },
              "upvoteCount": 256,
              "downvoteCount": 12,
              "ContextOutCount": 1,
              "onBlockchain": true,
              "blockchainId": "xyz456"
            }
            

            
          

          return postDetails
          
        }
        catch(e){
          return GQLErrorFilter(e.message,"can't get the post",null)
        }
      },
      getPage:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const pageDetails = [
            {
              "posttitle":"kim1",
              "username":"kim1",
              "firstname":"Kim1",
              "lastname":"K",
              "pic":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              "lastseen":"last seen recently",
              "communicationScore":4.3,
            },
          ]

          return pageDetails

        }catch(e){
          return GQLErrorFilter(e.message,"can't get page details",null)
        }
      },
      getComments:async(parents,args,{ req, res, auth })=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)

          const commentDetails = [
            {
              "posttitle":"kim1",
              "username":"kim1",
              "firstname":"Kim1",
              "lastname":"K",
              "pic":"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              "lastseen":"last seen recently",
              "communicationScore":4.3,
            },
          ]
          
          return commentDetails

        }
        catch(e){
          return GQLErrorFilter(e.message,"can't get comments",null)
        }
      },

    },
    Mutation: {

      sendRequest:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      addPost:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      sendPostRequest:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      addComment:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      sendCommentRequest:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      addPage:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
      sendPageRequest:async(parents,args,{ req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          return "success"
        }catch(e){
          return GQLErrorFilter(e.message,"request send failed",null)
        }
      },
           
    },
}
 
module.exports = { ContentTypes, ContentResolver }
