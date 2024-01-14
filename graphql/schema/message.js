const { createPubSub } = require("graphql-yoga")
const { getLastseen, GQLErrorFilter } = require("../utils/utils")
const UserModel = require("../models/user")
const { MessageModel } = require("../models/message")

const pubSub = createPubSub()

const MessageTypes = `
  
  type MessageType{ 
    id:String sender:String receiver:String 
    message:String image:String timestamp:String 
  }

  type MessageNode{ username:String firstname:String lastname:String profilePic:String message:String }

  input MessageInput{ sender:String receiver:String message:String }

  type NotificationType{
    id:String
    sender_username:String
    sender_pic:String
    message:String
    type:String
    latestdate:String
  }

  type Query{
    findsenders(search:String, type:String):[MessageNode]
    getMessages(username:String, latestdate:String):[MessageType]
    getNotifications(type:String):[NotificationType]
  }

  type Mutation { 
    sendMessage(messageInput:MessageInput):String
    selectConversation(usernamelist:[String], option:String):String
    selectNotifications(notification_id:String, option:String):String
  }

  type Subscription {
    newMessages: [MessageType]
    newNotifications: [NotificationType]
  }
    
`


const MessageResolver = {

    Query:{

      findsenders:async(parents,args,{req, res, auth})=>{
        try{
          // const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const {type} = args
          
          if(type==="ARCHIVE"){
            return []
          }

          const messageNodelist = [
            { username: "a", firstname: "FA", lastname: "LA", profilePic: "", message: "You:Hi" },
            { username: "b", firstname: "FB", lastname: "LB", profilePic: "", message: "You:Hi" },
            { username: "c", firstname: "FC", lastname: "LC", profilePic: "", message: "Hi" },
            { username: "d", firstname: "FD", lastname: "LD", profilePic: "", message: "You:Hi" },
            { username: "e", firstname: "FE", lastname: "LE", profilePic: "", message: "You:Hi" },
            { username: "f", firstname: "FF", lastname: "LF", profilePic: "", message: "You:Hi" },
            { username: "g", firstname: "FG", lastname: "LG", profilePic: "", message: "Hi" },
            { username: "h", firstname: "FH", lastname: "LH", profilePic: "", message: "You:Hi" },
            { username: "i", firstname: "FI", lastname: "LI", profilePic: "", message: "You:Hi" },
            { username: "j", firstname: "FJ", lastname: "LJ", profilePic: "", message: "You:Hi" },
            { username: "k", firstname: "FK", lastname: "LK", profilePic: "", message: "Hi" },
            { username: "l", firstname: "FL", lastname: "LL", profilePic: "", message: "You:Hi" },
          ]
          

          return messageNodelist


        }
        catch(e){
          console.log("e.message",e.message)
          return GQLErrorFilter(e.message,"can't get the inbox", null)
        }
      },


      getMessages:async(parents,args,{req,res})=>{
        try{

          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const { username } = args

          /*

          const user1 = UserModel.findOne({ _id })
          const user2 = UserModel.findOne({ username })

          const messages = await MessageModel.find(
            {
              sender:{ 
                $in: [ user1.username, user2.username ]
              },
              reciever:{
                $in: [ user1.username, user2.username ]
              }
            }
          )

          */

          const messagelist = [
            { sender:"1", reciever:"2", message:"I'am good, what about you ?"},
            { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ?"},
            { sender:"2", reciever:"1", message:"I'am good, what about you ?"},
            { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
            { sender:"2", reciever:"1", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
            { sender:"2", reciever:"1", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
            { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
            { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
        
          ]


          return messagelist

        }
        catch(e){
          return GQLErrorFilter(e.message,"can't get the messages", null)
        }
      },
      

      getNotifications:async(parents,args,{req, res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const user = UserModel.findOne({ _id })
          const { type } = args

          
          
          const all_notifications = [
            {
              id:"0",
              sender_username:"kim1",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have matched with kim1",
              type:"MATCH",
              latestdate:"10"
            },
            {
              id:"1",
              sender_username:"kim7",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have matched with kim7",
              type:"MATCH",
              latestdate:"10"
            },
            {
              id:"2",
              sender_username:"kim2",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have recieved communication feedback from kim2",
              type:"COMMUNICATION_FEEDBACK",
              latestdate:"10"

            },
            {
              id:"3",
              sender_username:"kim3",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have recieved communication feedback from kim3",
              type:"COMMUNICATION_FEEDBACK",
              latestdate:"8"

            },
            {
              id:"4",
              sender_username:"kim4",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have recieved communication feedback from kim4",
              type:"COMMUNICATION_FEEDBACK",
              latestdate:"10"
            },
            {
              id:"8",
              sender_username:"kim8",
              sender_pic:"https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
              message:"You have recieved communication feedback from kim8",
              type:"COMMUNICATION_FEEDBACK",
              latestdate:"8"

            },
          ]

          let finalNotification = null

          if(all_notifications){
            switch(type){
              case "matches": 
                    finalNotification = all_notifications.filter(it=>it.type==="MATCH")
                    break;
              case "communication": 
                    finalNotification = all_notifications.filter(it=>it.type==="COMMUNICATION_FEEDBACK")
                    break;
              case "all": 
                    finalNotification = all_notifications
                    break;
            }
          }

          
          return finalNotification

        }
        catch(e){
          console.log("e.message",e.message)
          return GQLErrorFilter(e.message,"can't get the notifications", null)
        }
      },
    },
    Mutation: {
      sendMessage:async(parents,args,{auth,req,res})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          // const user = UserModel.findOne({ _id })
          return "success"
        }
        catch(e){
          return GQLErrorFilter(e.message,"can't send the message", null)

        }
      },
      selectConversation:async(parents,args,{req,res, auth})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          // const user = UserModel.findOne({ _id })
          console.log("args",args)

          return "success"

        }
        catch(e){

          return GQLErrorFilter(e.message,"can't select the conversation", null)

        }
      },
      selectNotifications:async(parents,args,{req,res})=>{
        try{
          // const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          // const user = UserModel.findOne({ _id })

          return "success"

        }
        catch(e){
          console.log("e.msg",e.message)
          return GQLErrorFilter(e.message,"can't select the notification", null)

        }
      },
    },
    Subscription: {
      newMessages:async(parents,args,{req,res})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const user = UserModel.findOne({ _id })

        }
        catch(e){
          return GQLErrorFilter(e.message,"can't get the new message", null)
        }
      },
      newNotifications:async(parents,args,{req,res})=>{
        try{
          const { _id } = auth.verifyToken("ACCESS_TOKEN", null, req)
          const user = UserModel.findOne({ _id })

        }
        catch(e){
          return GQLErrorFilter(e.message,"can't send the new notification", null)
        }
      },
    }
    
}
 
module.exports = { MessageTypes, MessageResolver }
