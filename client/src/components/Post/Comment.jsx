import React, { useState, useEffect } from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useNavigate, useParams } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize'
import { CircularProgress, Chip, Avatar, IconButton, Button, TextField } from '@mui/material';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, Menu, MenuItem,  } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const Comment = (props) => {

  const [ width, ] = useWindowSize()

  const navigate = useNavigate()

  const [comments, setComments] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const [parentCommentID, setParentCommentID] = useState(null)
  const [parentComment, setParentComment] = useState(null)

  const [ commentText, setCommentText ] = useState(null)

  const [ selectedIdx, setSelectedIdx ] = useState(-1)
  const [ reloadComments, setReloadComments ] = useState(-1)


    const postID = props.postID
    const filterCommentId = props.filterCommentId

    // const readerPublicUsername = props.readerPublicUsername 
    const readerPicIcon = props.readerPicIcon 


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenuClick = (event, index) => {
      setSelectedIdx(index)
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleMenuItemClick = (option, index) => {
      console.log("d",option, selectedIdx)
      if(option == "DELETE"){

        doAddContent({
          variables: {
            contentInput:{
                type:"COMMENT",
                operation:"DELETE",
                commentInput:{
                  commentId:comments[selectedIdx]._id,
                }
            }
          },
          fetchPolicy: "network-only"
        })

        setReloadComments(reloadComments+1)
  
      }

      if(option == "COPY"){
        navigator.clipboard.writeText(comments[selectedIdx].text)
      }

      setAnchorEl(null);
      
    };


    const voteClick = (vote, index) => {
      
      console.log("vote ",vote, index)
      console.log("comments ",comments[index])
      
      let operation = null
      let upvote = null
  

      let newComments = comments.map((it,i)=>{
        
        if(i == index){

          let upCount, downCount, readV

          if(it.readerUpvoted == null){
            
            if(vote == "up"){
              upCount = it.upvoteCount+1
              downCount = it.downvoteCount
              readV = true
              
              operation = "ADD"
              upvote = true
      
            }
  
            if(vote == "down"){
              upCount = it.upvoteCount
              downCount = it.downvoteCount+1
              readV = false
              
              operation = "ADD"
              upvote = false
      
            }

          }

          if(it.readerUpvoted != null){
            
            if(vote == "up" && it.readerUpvoted == true){
              upCount = it.upvoteCount-1
              downCount = it.downvoteCount
              readV = null

              operation = "DELETE"
              upvote = null
      
            }
  
            if(vote == "down" && it.readerUpvoted == false){
              upCount = it.upvoteCount
              downCount = it.downvoteCount-1
              readV = null

              operation = "DELETE"
              upvote = null
      
            }

            if(vote == "up" && it.readerUpvoted == false){
              upCount = it.upvoteCount+1
              downCount = it.downvoteCount-1
              readV = true

              operation = "ADD"
              upvote = true
      
            }

            if(vote == "down" && it.readerUpvoted == true){
              upCount = it.upvoteCount-1
              downCount = it.downvoteCount+1
              readV = false

              operation = "ADD"
              upvote = false
      
            }


          }

          console.log("index",index)
          console.log(upCount, downCount, readV)

          return {
            ...it,
            upvoteCount:upCount,
            downvoteCount:downCount,
            readerUpvoted:readV
          }
        }
        return it
      })

      doAddContent({
        variables:{
          contentInput:{
            type:"UPVOTE",
            operation: operation,
            voteInput:{
              commentId:comments[index]._id, 
              upvote: upvote 
            }
          }
        },
        fetchPolicy:"network-only"
      })
  
      setComments(newComments)


    }
  


    const GET_COMMENTS_QUERY = gql`
        query GetContent($contentInput:ContentInput){
            getContent(contentInput:$contentInput){
                comments{
                  _id
                  parentCommentId
                  profilePicIcon
                  publicUsername
                  text
                  upvoteCount downvoteCount replyCount
                  timestamp
                  readerUpvoted
                }
                totalComments
            }
        }
    `;

    const ADD_CONTENT_QUERY = gql`
        mutation AddContent($contentInput:ContentInput) {
            addContent(contentInput:$contentInput)
        }
    `;

    const [ doloadComments, { data, loading, error }] = useLazyQuery(
    GET_COMMENTS_QUERY, { fetchPolicy: "network-only" }
    )
    
    const [doAddContent, { data: data2, loading: loading2, error: error2 }] = useMutation(
    ADD_CONTENT_QUERY, { fetchPolicy: "network-only" })
    
    useEffect(()=>{

      if(postID){
  
          doloadComments({
            variables:{
                contentInput:{
                type:"COMMENTS",
                operation:"VIEW",
                commentInput:{
                  commentId:filterCommentId,
                  currentCommentPage:currentPage,
                  postId:postID,
                  parentCommentId:parentCommentID
                }
              }
            },
            fetchPolicy: "network-only"
          })
  
      }

      setCommentText(null)
    
    }, [postID, parentCommentID, reloadComments])

    const addComment = (operation) => {

      console.log("adding comment")

      doAddContent({
        variables: {
          contentInput:{
              type:"COMMENT",
              operation:operation,
              commentInput:{
                postId:postID,
                parentCommentId:parentCommentID,
                text:commentText,
              }
          }
        },
        fetchPolicy: "network-only"
      })

      setReloadComments(reloadComments+1)


    }

    useEffect(()=>{
      if(data){
        if(data.getContent){
          setComments(data.getContent.comments)
        }
      }
    },[data])
   
   

    const wrapCommentInput = ({ text, placeholder }) => {

        return <div style={{  border:"1px solid #fff", padding:5, display:"flex" }} >
          <div style={{flexGrow:1, padding:5}}>
            <TextField multiline maxRows={6}
            placeholder={placeholder}
            value={commentText?commentText:""}
            onChange={(e)=>{ setCommentText(e.target.value) }}
            InputProps={{
              startAdornment:
              <div style={{paddingRight:10}}>
                <Avatar sx={{height:30, width:30}} src={readerPicIcon} />
              </div>,
              endAdornment:
                <div>
                  {
                    commentText && commentText.length > 0 ? 
                      <Button onClick={()=>{ addComment("ADD") }}
                        size="small" variant='contained' 
                        sx={{ borderRadius:3, textTransform:"none"}}>
                        {text} 
                      </Button>
                    :
                    <></> 
                  }
                </div>
            }}
            sx={{width:"100%"}} size="small" id="outlined-basic" variant="outlined" />
          </div>
        </div>
        
        
    }


    const wrapComment = ({
      _id, username, profilePicIcon,
      comment, index, parentCommentId,
      upvoteCount, downvoteCount, replyCount,
      timestamp, readerUpvoted, disabledVote,
    
    }) => {


      return <div>
        <div style={{padding:5, border:"1px solid #fff", display:"flex",}}>
            <div style={{padding:5, paddingTop:10, paddingLeft:10, border:"1px solid #fff"}}>
              <Avatar sx={{height:35, width:35}} src={profilePicIcon} />
            </div>
            <div style={{
              padding:5, border:"1px solid #fff", fontSize:15,
              overflowWrap: 'break-word', 
              wordWrap: 'break-word', 
              whiteSpace: 'normal', 
              }}>
              <div style={{display:"flex",}}>
                <div style={{display:"flex", flexDirection:"column" }}>
                  <div style={{}}>
                    <b>
                      {username} 
                    </b>
                  </div>
                  <div style={{ padding:2, paddingLeft:0,fontSize:12}}>
                    {timestamp}
                  </div>
                </div>
              </div>
              <div style={{ paddingRight:10, paddingTop:5}}>
                {comment} 
              </div> 
            </div>
            <div style={{flexGrow:1}}></div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} >
              <IconButton
                disabled={disabledVote}
                size="small"
                id={`basic-button`}
                aria-controls={open ? `basic-menu` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => { handleMenuClick(e, index) }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`basic-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                slotProps={{
                  paper: {
                    sx: {
                      border: "1px solid #efefef",
                      boxShadow: '0px 5px 5px #efefef'
                    }
                  }
                }}
                MenuListProps={{
                  'aria-labelledby': `basic-button`,
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={3} onClick={() => handleMenuItemClick("COPY", index)}>Copy Comments</MenuItem>
                <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={2} onClick={() => handleMenuItemClick("DELETE", index)}>Delete Comments</MenuItem>
              </Menu>
            </div>
          </div>
          <div style={{paddingLeft:40, border:"1px solid #fff"}}>
            <div style={{ display:"flex", border:"1px solid #fff",  paddingLeft:10, paddingRight:5, fontSize:14}}>
              <div style={{padding:2}}>
                <Button
                  disabled={disabledVote}
                  size="small"
                  variant='text'
                  onClick={(e)=>{ voteClick("up",index)  }}
                  style={{textTransform:"none", color:"#595959"}}
                  startIcon={
                    (readerUpvoted != null)?
                    readerUpvoted == true?<ThumbUpIcon />:<ThumbUpOffAltIcon />
                    :<ThumbUpOffAltIcon />
                  }
                >
                  ({ upvoteCount })
                </Button>
                
              </div>
              <div style={{padding:2}}>
              <Button
                  disabled={disabledVote}
                  size="small"
                  variant='text'
                  onClick={(e)=>{ voteClick("down",index)  }}
                  style={{textTransform:"none", color:"#595959"}}
                  startIcon={
                    (readerUpvoted != null)?
                     readerUpvoted == false?<ThumbDownIcon />:<ThumbDownOffAltIcon />
                    :<ThumbDownOffAltIcon />
                  }

                >
                  ({ downvoteCount })
                </Button>
              </div>
            </div>
            
              <div style={{paddingLeft:15}}>
                <Button
                    size="small" variant='text'
                    onClick={()=>{ 
                      setParentComment(
                        {
                          _id, username, profilePicIcon,
                          comment, index, parentCommentId,
                          upvoteCount, downvoteCount, replyCount,
                          timestamp, readerUpvoted, disabledVote:true
                        }
                      )
                      setParentCommentID(_id) 
                    }}
                    disabled={parentCommentID}
                    style={{textTransform:"none", color:"#595959", fontWeight:"bold"}}
                  >
                  { replyCount } replies
                </Button>
              </div>
            
          </div>
      </div>

    }

    const getDesktopView = () => {
        
        return (
            <div>
                <div style={{padding:5, border:"1px solid #efefef", borderRadius:5, marginTop:5, marginBottom:5}}>
                  {
                    parentCommentID?
                    <div>
                      <div>
                        <Button
                            size="small" variant='text'
                            onClick={()=>{ 
                              setParentCommentID(null)
                            }}
                            style={{textTransform:"none", color:"#595959", fontWeight:"bold"}}
                          >
                            Go back to main
                        </Button>
                      </div>
                      { wrapComment({...parentComment, disabledVote:true}) }
                    </div>
                    :
                    wrapCommentInput({text:"Add", placeholder:'Write your comment here...'})
                  }
                </div>
                <div style={{ display:"flex" ,fontSize:14, 
                  paddingLeft:15,paddingRight:15, 
                  paddingTop:parentCommentID?0:5, 
                  border:parentCommentID?"1px solid #efefef":"1px solid #efefef", 
                  height:"100%", borderRadius:5  }}>
                  {parentCommentID?<div style={{width:50}}></div>:""}
                  <div style={{flexGrow:1}}>
                    {
                      comments && comments.map((it, i)=>{
                        
                        const { 
                          _id, publicUsername, text, profilePicIcon,
                          parentCommentId, readerUpvoted, timestamp, 
                          upvoteCount, downvoteCount, replyCount
                        } = it
                        
                        return <div key={i}>
                            {wrapComment({ 
                              _id, username:publicUsername, profilePicIcon,
                              comment:text, index:i, parentCommentId,
                              upvoteCount, downvoteCount, replyCount,
                              timestamp, readerUpvoted, disabledVote:false
                            })}
                          </div>
    
                      })
                    }
                  </div>
                </div>
                <div 
                  style={{
                    padding:5, 
                    border:parentCommentID?"1px solid #efefef":"1px solid #fff", 
                    borderRadius:5, marginTop:5, marginBottom:5
                  }}>
                  {parentCommentID?wrapCommentInput({text:"Add", placeholder:'Write your reply here...'}):""}
                </div>

            </div>
        )

    }
    

    const getMobileView = () => {

        return <div style={{  padding:2, paddingTop:20, border:"1px solid #fff", fontSize:13   }}>
                <div style={{padding:5, border:"1px solid #efefef", borderRadius:5, marginTop:5, marginBottom:5}}>
                  {
                    parentCommentID?
                    <div>
                      <div>
                        <Button
                            size="small" variant='text'
                            onClick={()=>{ 
                              setParentCommentID(null)
                            }}
                            style={{textTransform:"none", color:"#595959", fontWeight:"bold"}}
                          >
                            Go back to main
                        </Button>
                      </div>
                      { wrapComment({...parentComment, disabledVote:true}) }
                    </div>
                    :
                    wrapCommentInput({text:"Add", placeholder:'Comment here...'})
                  }
                </div>
                <div style={{ 
                  display:"flex" ,fontSize:14, padding:15, paddingTop:10, 
                  border:parentCommentID?"1px solid #fff":"1px solid #efefef", 

                  height:"100%", borderRadius:5  }}>
                  {parentCommentID?<div style={{width:50}}></div>:""}
                  <div style={{flexGrow:1}}>
                    {
                      comments && comments.map((it, i)=>{
                        
                        const { 
                          _id, publicUsername, text, profilePicIcon,
                          parentCommentId, readerUpvoted, timestamp, 
                          upvoteCount, downvoteCount, replyCount
                        } = it
                        
                        return <div key={i}>
                            {wrapComment({ 
                              _id, username:publicUsername, profilePicIcon,
                              comment:text, index:i, parentCommentId,
                              upvoteCount, downvoteCount, replyCount,
                              timestamp, readerUpvoted, disabledVote:false
                            })}
                          </div>
    
                      })
                    }
                  </div>
                </div>
                <div style={{padding:5, 
                  border:parentCommentID?"1px solid #efefef":"1px solid #fff", 
                  borderRadius:5, marginTop:5, marginBottom:5}}>
                  {parentCommentID?wrapCommentInput({text:"Add", placeholder:'reply here...'}):""}
                </div>
                
              </div>
    }


    return (
        <div>
          {
            !loading ?
              <div>
                {(width > 800 ? getDesktopView() : <></>)}
                {(width < 800 ? getMobileView() : <></>)}
              </div>
              :
              <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </div>
              </div>
          }
        </div>
      )
    

}

export default Comment