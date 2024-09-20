import React, {useState, useEffect} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Avatar from '@mui/material/Avatar';
import { IconButton, TextField } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoodIcon from '@mui/icons-material/Mood';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

import { FRONT_IMAGE } from '../../config/config';
import { useQuery, useLazyQuery, gql, useMutation  } from '@apollo/client';

const Conversation = (props) => {

  const [width,] = useWindowSize()

  const {username} = useParams()

  const [pageNo, setPageNo] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1)
  const [ messageList, setMessageList ] = useState([])

  const [myprofile, setMyProfile] = useState(null)

  const [ currentMessage, setCurrentMessage] = useState("")
  let [scrollIndex, setScollIndex] = useState(20)


  const GET_PROFILE_INFO = gql`
    query GetProfileView($username:String, $view:String){
      getProfileView(username:$username, view:$view){
        username
        firstname
        lastname
        profilePic
      }
    }
  `

  const GET_MESSAGES_QUERY = gql`
    query GetMessages($username:String, $pageNo:Int){
      getMessages(username:$username, pageNo:$pageNo){
        currentPage
        totalPages
        messages{
          sender 
          receiver 
          content{
            image
            sticker
            message
          }
          timestamp
        }
      }
    }
  `

  const SEND_MESSAGE_QUERY = gql`
    mutation SendMessage($messageInput:MessageInput){
      sendMessage(messageInput:$messageInput){
        sender 
        receiver 
        content{
          image
          sticker
          message
        }
        timestamp
      }
    }

  `
  

  const [ doSendMessage, {data:data2, error:error2, loading:loading2}] = useMutation(SEND_MESSAGE_QUERY,
    { fetchPolicy:"network-only" })

  const [doGetProfileInfo , { data: dataH, error: errorH, loading: loadingH }] = useLazyQuery(GET_PROFILE_INFO, 
    { variables:{ username: (username !==null || username !== "to")?username:null, view:"message" }, fetchPolicy: "network-only" })


  const [ getMoreMessages , { data, error, loading }] = useLazyQuery(GET_MESSAGES_QUERY, 
    { variables:{ username: (username !==null || username !== "to")?username:null, pageNo:pageNo }, 
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        if (pageNo === 1) {
          setTotalPages(data.getMessages.totalPages);
        }
        setPageNo(data.getMessages.currentPage)
        setMessageList(
          (prevMessageList) =>{
            const msglist = data.getMessages.messages
            const rev = [...msglist].reverse();
            return [
              ...rev,
              ...prevMessageList,
            ]
          }
        );
      }
    }, 
  })

  useEffect(()=>{

    if(data2){

      setCurrentMessage("")

      setMessageList(
        (prevMessageList) =>{
          const newMessage = data2.sendMessage
          return [
            ...prevMessageList,
            newMessage
          ]
        }
      )

    }
   

  },[data2])
  
  if(error2){
    console.log("error2 ",error2)
  }

  // console.log("username",username)
  useEffect(()=>{
    doGetProfileInfo();
  },[doGetProfileInfo])

  const handleSendMessage = () => {
    doSendMessage({
      variables:{
        messageInput:{
          username: username,
          content:{
            message: currentMessage,
          }
        }
      }, 
      fetchPolicy:"network-only"
    })
  }


  useEffect(()=>{

    if(username && pageNo > 1 && pageNo <= totalPages)
    {
      console.log("pageNo",pageNo)
      
      getMoreMessages({
        variables:{
          username:username,
          pageNo:pageNo
        },
        fetchPolicy:"network-only"
      })

    }

  },[getMoreMessages, pageNo]) 

  useEffect(()=>{
    
    if(username){
      
      getMoreMessages({
        variables:{
          username: username,
          pageNo:1
        },
        fetchPolicy:"network-only"
      })

  
    }

  },[getMoreMessages, username])

  const { liveMessages } = props

  useEffect(()=>{

    const newMessages = liveMessages.filter(it=> it.sender == username || 
      it.receiver == username)

    if(newMessages.length > 0){
      
      const newMessage = newMessages[newMessages.length-1]

      setMessageList([
        ...messageList,
        newMessage
      ])

      

    }

  },[liveMessages])


  useEffect(()=>{
    
    if(data){
      setScollIndex(messageList.length-1)
    }

  },[messageList, data])

  useEffect(()=>{
    if(dataH){
      setMyProfile(dataH.getProfileView)
    }
  },[dataH])

  const rowRenderer = ({index,style,key}) => {

    const { sender, receiver, content, timestamp } = messageList[index]
    const { message } = content


    return <div key={key} style={{...style, width:380, border:"1px solid #fff" }}>
        <div style={{width:360, fontSize:15 }}>
          {
            receiver === username ?
              <div style={{display:"flex", }}>
                <div style={{flexGrow:1}}></div>
                <div style={{ width:160, border:"1px solid #fafafa", background:"#ECF9FF", padding:5 ,borderRadius:5, maxWidth:180, paddingLeft:10, paddingRight:10 }} >
                  <Typography sx={{lineHeight:2,}}  variant="body2" component="body2">
                    {message} 
                  </Typography>
                  <div style={{fontSize:10, display:"flex"}}>
                    <div style={{flexGrow:1}}></div>
                    <div>
                      {timestamp}
                    </div>
                  </div>
                </div>
              </div>
              :
              <div style={{display:"flex"}}>
                <div style={{ width:30, height:30, paddingTop:5, }}>
                  {
                    myprofile && myprofile.profilePic?
                      <Avatar src={myprofile.profilePic} sx={{height:28, width:28}} alt="Remy Sharp" />
                    :<></>
                  }
                </div>
                <div style={{ width:160, border:"1px solid #fafafa", background:"#fafafa", padding:5 , marginLeft:5, borderRadius:5 , maxWidth:180,paddingLeft:10, paddingRight:10 }} >
                  <Typography sx={{lineHeight:2}}  variant="body2" component="body2">
                    {message} 
                  </Typography>
                  <div style={{fontSize:10, display:"flex"}}>
                    <div style={{flexGrow:1}}></div>
                    <div>
                      {timestamp}
                    </div>
                  </div>
                </div>
                <div style={{flexGrow:1}}></div>
              </div>
          }
        </div>
    </div>
  }

  const rowMobileRenderer = ({index,style,key}) => {

    const { sender, receiver, content, timestamp } = messageList[index]
    const { message } = content

    return <div key={key} style={{...style, width:"95%", }}>
        <div>
          {
            receiver === username ?
              <div style={{display:"flex", }}>
                <div style={{flexGrow:1}}></div>
                <div style={{ width:140, border:"1px solid #fafafa", background:"#ECF9FF", padding:5, borderRadius:5 ,paddingLeft:10, paddingRight:10 ,  }} >
                  <Typography sx={{lineHeight:2}} color={"#000"} variant="body2" component="body2">
                    {message}  
                  </Typography>
                  <div style={{fontSize:10, display:"flex", color:"#000"}}>
                    <div style={{flexGrow:1}}></div>
                    <div>
                      {timestamp}
                    </div>
                  </div>
                </div>
              </div>
              :
              <div style={{display:"flex", }}>
                <div style={{ width:30, height:30, paddingTop:5, }}>
                  {
                    myprofile && myprofile.profilePic?
                      <Avatar src={myprofile.profilePic} sx={{height:28, width:28}} alt="Remy Sharp" />
                    :<></>
                  }
                </div>
                <div style={{ width:140, border:"1px solid #fafafa", color:"#000" ,background:"#fafafa", padding:5, marginLeft:5, borderRadius:5, paddingLeft:10, paddingRight:10  }} >
                  <Typography sx={{lineHeight:2}}  variant="body2" component="body2">
                    {message}   
                  </Typography>
                  <div style={{fontSize:10, display:"flex"}}>
                    <div style={{flexGrow:1}}></div>
                    <div>
                      {timestamp}
                    </div>
                  </div>
                </div>
                <div style={{flexGrow:1}}></div>
              </div>
          }
        </div>
    </div>
  }

  const getDesktopView = () => {
    const frontImage = FRONT_IMAGE
    return <div>
              {
                username === "to"?
                <div style={{ height:"100%", display:"flex", justifyContent:"center", flexDirection:"column"  }}>
                    <div style={{ display:"flex", justifyContent:"center"}}>
                        <img alt="frontimage" width={"80%"} src={frontImage} />
                    </div>
                </div>
                :
                <div>
                  {myprofile?
                    <Link style={{ color: "#000", textDecoration: "none", }} to={"/profile/view/" + myprofile.username} >
                      <div style={{ display: "flex", paddingLeft:10 , paddingTop: 15, paddingBottom: 15, width: 390, height:40 }}>
                                  <div style={{ width: 50, paddingTop: 5, paddingLeft: 5 }}>
                                    {
                                      myprofile && myprofile.profilePic?
                                        <Avatar src={myprofile.profilePic} sx={{height:40, width:40}} alt="Remy Sharp" >
                                        </Avatar>
                                      :<></>
                                    }
                                  </div>
                                  <div style={{paddingLeft:10, paddingTop:10}} >
                                    <div style={{ fontSize: 22, }}>
                                      {myprofile && myprofile.firstname} {myprofile && myprofile.lastname}  
                                    </div>
                                    <div style={{ fontSize: 14, color:"#595959" }}>
                                    </div>
                                  </div>
                                  <div style={{ flexGrow: 1 }}></div>
                                  <div>
                                    
                                  </div>
                                
                      </div>
                    </Link>
                  :""}
                  <hr style={{border:"1px solid #efefef"}} />
                  <div style={{ display: "flex", flexDirection: "column", height:360  }}>
                    <div style={{ paddingLeft:10 ,width:380, flexGrow:1, minHeight:220,  }}>
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                              width={width}
                              height={height}
                              rowCount={messageList.length}
                              rowHeight={({index})=>{ 
                                const { message } = messageList[index].content
                                let line = Math.ceil(message.length/27)
                                if(line == 0) return 80
                                if(line == 1) return 100
                                return 60+ (line-1)*60
                              }}
                              rowRenderer={rowRenderer}
                              scrollToIndex={scrollIndex}
                              onScroll={(e)=>{
                                const { scrollTop } = e
                                
                                if(scrollTop == 0){
                                  if(pageNo < totalPages){
                                    setPageNo(pageNo+1)
                                  }
                                }

                              }}
                          />
                        )}
                      </AutoSizer>
                    </div>
                    <div style={{ display: "flex", marginTop: 5, width:380, padding: 10, overflowY: "auto" }}>
                        { !error ?
                          <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {/* {
                                  message.length > 0?
                                    <></>:
                                    <IconButton onClick={handlePic}>
                                      <InsertPhotoIcon />
                                    </IconButton>
                                }
                                <IconButton onClick={handleEmojiClick}>
                                  <MoodIcon />
                                </IconButton> */}
                              </InputAdornment>
                            ),
                            endAdornment:(
                              <InputAdornment position='end'>
                                <IconButton 
                                disabled={currentMessage == ""}
                                onClick={handleSendMessage} >
                                  <SendIcon/>
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          placeholder='Write message ...'
                          size="small"
                          sx={{ 
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#efefef',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#efefef',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#efefef',
                                },
                              },
                          }}
                          style={{width:"100%", height:"100%",}}
                          id="outlined-multiline-flexible"
                          value={currentMessage}
                          onChange={(e)=>{
                            const start = e.currentTarget.selectionStart
                            const value = e.target.value 
                            setCurrentMessage(value)
                          }}
                          multiline
                          maxRows={5}
                        />:<></>}
                    </div>
                  </div>
                </div>
              }
            </div>
  }

  const getMobileView = () => {
    return <div style={{  }}>

            <div style={{ display: "flex", paddingTop: 15, paddingBottom: 15,  height:40 }}>
              <div style={{  paddingTop: 2, paddingRight:10 }}>
                <IconButton>
                  <Link style={{textDecoration:"none", color:"#595959"}} to="/message/to">
                    <ArrowBackIcon />
                  </Link>
                </IconButton>
              </div>
              {myprofile?
              <Link style={{ color: "#000", textDecoration: "none", }} to={"/profile/view/" + myprofile.username} >
                <div style={{display:"flex"}}>
                  <div style={{  paddingTop: 2, }}>
                    {
                      myprofile && myprofile.profilePic?
                        <Avatar src={myprofile.profilePic} sx={{height:30, width:30}} alt="Remy Sharp" />
                      :<></>
                    }
                  </div>
                  <div style={{paddingLeft:10, paddingTop:5}} >
                    <div style={{ fontSize: 18, }}>
                      {myprofile && myprofile.firstname}  {myprofile && myprofile.lastname}  
                    </div>
                    <div style={{ fontSize: 14, color:"#595959",paddingTop:3 }}>

                    </div>
                  </div>
                </div>
              </Link>
              :""}
            </div>

            <hr style={{border:"1px solid #efefef"}} />
            <div style={{ display: "flex", flexDirection: "column", height:"80vh",   }}>
              <div style={{ paddingLeft:5 ,width:"98%", flexGrow:1, minHeight:220,  }}>
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={messageList.length}
                        rowHeight={({index})=>{ 
                          const { message } = messageList[index].content
                          let line = Math.ceil(message.length/27)
                          if(line == 0) return 70
                          if(line == 1) return 90
                          return 50+ (line-1)*50
                        }}
                        rowRenderer={rowMobileRenderer}
                        scrollToIndex={scrollIndex}
                        onScroll={(e)=>{
                          const { scrollTop } = e
                          
                          if(scrollTop == 0){
                            if(pageNo < totalPages){
                              setPageNo(pageNo+1)
                            }
                          }

                        }}

                    />
                  )}
                </AutoSizer>
              </div>
              <div style={{ display: "flex",  marginTop: 5, width:"95%", padding: 5, overflowY: "auto" }}>
                
                <TextField
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* {
                        message.length > 0?
                          <></>:
                          <IconButton>
                            <InsertPhotoIcon />
                          </IconButton>
                      } */}
                      {/* <IconButton
                        // onClick={()=>handleOnClickEmoji()}
                      >
                        <MoodIcon />
                      </IconButton> */}
                    </InputAdornment>
                  ),
                  endAdornment:(
                    <InputAdornment position='end'>
                      <IconButton 
                        disabled={currentMessage == ""}
                        onClick={handleSendMessage}>
                        <SendIcon/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                placeholder='Write message ...'
                size="small"
                sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#efefef',
                      },
                      '&:hover fieldset': {
                        borderColor: '#efefef',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#efefef',
                      },
                    },
                }}
                style={{width:"100%", height:"100%",}}
                id="outlined-multiline-flexible"
                value={currentMessage}
                onChange={(e)=>{
                  const start = e.currentTarget.selectionStart
                  const value = e.target.value 
                  setCurrentMessage(value)
                }}
                multiline
                maxRows={5}
              />
              </div>
            </div>
    </div>

  }


  return (
    <div style={{ display: "flex", justifyContent: "center", height: '100%', border:"1px solid #fff", width:"100%" }}>
        {(width > 800 ? getDesktopView() : <></>)}
        {(width < 800 ? getMobileView() : <></>)}
    </div>
  )
}

export default Conversation