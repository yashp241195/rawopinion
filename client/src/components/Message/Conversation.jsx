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
import EmojiPicker from 'emoji-picker-react'
import Tooltip from '@mui/material/Tooltip';

import { FRONT_IMAGE } from '../../config/config';
import { useQuery, useMutation, gql  } from '@apollo/client';

const Conversation = () => {

  const [width,] = useWindowSize()

  const {username} = useParams()
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const [message, setMessage] = useState("")

  const GET_PROFILE_INFO = gql`
    query GetProfileView($username:String){
      getProfileView(username:$username){
        username
        firstname
        lastname
        lastseen
      }
    }
  `

  const GET_MESSAGES_QUERY = gql`
    query GetMessages($username:String){
      getMessages(username:$username){
        sender receiver message
      }
    }
  `

  const { data: dataH, error: errorH, loading: loadingH } = useQuery(GET_PROFILE_INFO, { variables:{ username: username }, fetchPolicy: "network-only" })
  const { data: data, error: error, loading: loading } = useQuery(GET_MESSAGES_QUERY, { fetchPolicy: "network-only" })

  console.log("convo")

  if(dataH){
    console.log("dataH",dataH)
  }
  if(errorH){
    console.log("errorH",errorH)
  }

  const handlePic = () => {
    
  }

  const handleEmojiClick = () => {

  }


  const mylist = [
    { sender:"1", reciever:"2", message:"I'am good, what about you ?"},
    { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ?"},
    { sender:"2", reciever:"1", message:"I'am good, what about you ?"},
    { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
    { sender:"2", reciever:"1", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
    { sender:"2", reciever:"1", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
    { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},
    { sender:"1", reciever:"2", message:"I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ? I'am good, what about you ?"},

  ]

  const [scrollIndex, setScrollIndex] = useState(10)


  useEffect(()=>{
    
  },[])


  const rowRenderer = ({index,style,key}) => {

    const username = "1"
    const { sender, reciever, message } = mylist[index]

    return <div key={key} style={{...style, width:380, }}>
        <div style={{width:360, fontSize:15 }}>
          {
            sender === username ?
              <div style={{display:"flex", }}>
                <div style={{flexGrow:1}}></div>
                <div style={{border:"1px solid #fafafa", background:"#ECF9FF", padding:5 ,borderRadius:5, maxWidth:180, paddingLeft:10, paddingRight:10 }} >
                  <Typography sx={{lineHeight:2,}}  variant="body2" component="body2">
                    {message} 
                  </Typography>
                </div>
              </div>
              :
              <div style={{display:"flex"}}>
                <div style={{ width:30, height:30, paddingTop:5, }}>
                  <Avatar sx={{height:28, width:28}}></Avatar>
                </div>
                <div style={{border:"1px solid #fafafa", background:"#fafafa", padding:5 , marginLeft:5, borderRadius:5 , maxWidth:180,paddingLeft:10, paddingRight:10 }} >
                  <Typography sx={{lineHeight:2}}  variant="body2" component="body2">
                    {message} 
                  </Typography>
                </div>
                <div style={{flexGrow:1}}></div>
              </div>
          }
        </div>
    </div>
  }

  const rowMobileRenderer = ({index,style,key}) => {

    const username = "1"
    const { sender, reciever, message } = mylist[index]

    return <div key={key} style={{...style, width:width*0.86, }}>
        <div>
          {
            sender === username ?
              <div style={{display:"flex", }}>
                <div style={{flexGrow:1}}></div>
                <div style={{border:"1px solid #fafafa", color:"#fff", background:"#ECF9FF", padding:5, borderRadius:5 ,paddingLeft:10, paddingRight:10 , maxWidth:180 }} >
                  <Typography sx={{lineHeight:2}} color={"#000"} variant="body2" component="body2">
                    {message} 
                  </Typography>
                </div>
              </div>
              :
              <div style={{display:"flex", }}>
                <div style={{ width:30, height:30, paddingTop:5, }}>
                  <Avatar sx={{height:28, width:28}}></Avatar>
                </div>
                <div style={{border:"1px solid #fafafa", color:"#000" ,background:"#fafafa", padding:5, marginLeft:5, borderRadius:5, paddingLeft:10, paddingRight:10 , maxWidth:180 }} >
                  <Typography sx={{lineHeight:2}}  variant="body2" component="body2">
                    {message} 
                  </Typography>
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
                  <div style={{ display: "flex", paddingLeft:10 , paddingTop: 15, paddingBottom: 15, width: 390, height:40 }}>
                    <div style={{ width: 50, paddingTop: 5, paddingLeft: 5 }}>
                      <Avatar sx={{height:40, width:40}} alt="Remy Sharp" />
                    </div>
                    <div style={{paddingLeft:10, paddingTop:5}} >
                      <div style={{ fontSize: 18, }}>
                        {dataH && dataH.getProfileView.firstname} {dataH && dataH.getProfileView.lastname}  
                      </div>
                      <div style={{ fontSize: 14, color:"#595959" }}>
                        {dataH && dataH.getProfileView.lastseen}
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                      
                    </div>
                  
                  </div>
                  <hr style={{border:"1px solid #efefef"}} />
                  <div style={{ display: "flex", flexDirection: "column", height:360  }}>
                    <div style={{ paddingLeft:10 ,width:380, flexGrow:1, minHeight:220,  }}>
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                              width={width}
                              height={height}
                              rowCount={mylist.length}
                              rowHeight={({index})=>{ 
                                const { message } = mylist[index]
                                let line = Math.round(message.length/27)
                                if(line == 1) return 50
                                return 50+(line-1)*30
                              }}
                              rowRenderer={rowRenderer}
                              scrollToIndex={scrollIndex}
                              onScroll={(e)=>{
                                const scrollTop = e.scrollTop
                                if(e.scrollTop < 220){
                                  console.log("scrollback")
                                  
                                }
                              }}
                          />
                        )}
                      </AutoSizer>
                    </div>
                    <div style={{ display: "flex", marginTop: 5, width:380, padding: 10, overflowY: "auto" }}>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {
                                  message.length > 0?
                                    <></>:
                                    <IconButton onClick={handlePic}>
                                      <InsertPhotoIcon />
                                    </IconButton>
                                }
                                <IconButton onClick={handleEmojiClick}>
                                  <MoodIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment:(
                              <InputAdornment position='end'>
                                <IconButton>
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
                          value={message}
                          onChange={(e)=>{
                            const start = e.currentTarget.selectionStart
                            const value = e.target.value 
                            setMessage(value)
                          }}
                          multiline
                          maxRows={5}
                        />
                    </div>
                  </div>
                </div>
              }
            </div>
  }

  const getMobileView = () => {
    return <div style={{   }}>

            <div style={{ display: "flex", paddingTop: 15, paddingBottom: 15, width: "90%", height:40 }}>
              <div style={{  paddingTop: 2, paddingRight:10 }}>
                <IconButton>
                  <Link style={{textDecoration:"none", color:"#595959"}} to="/message/to">
                    <ArrowBackIcon />
                  </Link>
                </IconButton>
              </div>
              <div style={{  paddingTop: 2, }}>
                <Avatar sx={{height:40, width:40}} alt="Remy Sharp" />
              </div>
              <div style={{paddingLeft:10, paddingTop:2}} >
                <div style={{ fontSize: 16, }}>
                  {dataH && dataH.getProfileView.firstname}  {dataH && dataH.getProfileView.lastname}  
                </div>
                <div style={{ fontSize: 14, color:"#595959",paddingTop:3 }}>
                  {dataH && dataH.getProfileView.lastseen}
                </div>
              </div>
              <div style={{ flexGrow: 1 }}></div>
              <div>
                
              </div>
            
            </div>
            <hr style={{border:"1px solid #efefef"}} />
            <div style={{ display: "flex", flexDirection: "column", height:"80vh",   }}>
              <div style={{ paddingLeft:10 ,width:"95%", flexGrow:1, minHeight:220,  }}>
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={mylist.length}
                        rowHeight={({index})=>{ 
                          const { message } = mylist[index]
                          let line = Math.round(message.length/27)
                          if(line == 1) return 50
                          return 50+(line-1)*30
                        }}
                        rowRenderer={rowMobileRenderer}
                        scrollToIndex={scrollIndex}
                        onScroll={(e)=>{
                          const scrollTop = e.scrollTop
                          if(e.scrollTop < 220){
                            console.log("scrollback")
                            
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
                      {
                        message.length > 0?
                          <></>:
                          <IconButton>
                            <InsertPhotoIcon />
                          </IconButton>
                      }
                      <IconButton
                        // onClick={()=>handleOnClickEmoji()}
                      >
                        <MoodIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment:(
                    <InputAdornment position='end'>
                      <IconButton>
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
                value={message}
                onChange={(e)=>{
                  const start = e.currentTarget.selectionStart
                  const value = e.target.value 
                  setMessage(value)
                }}
                multiline
                maxRows={5}
              />
              </div>
            </div>
    </div>

  }


  return (
    <div style={{ display: "flex", justifyContent: "center", height: '100%' }}>
        {(width > 800 ? getDesktopView() : <></>)}
        {(width < 800 ? getMobileView() : <></>)}
    </div>
  )
}

export default Conversation