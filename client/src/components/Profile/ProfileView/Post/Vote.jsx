import React, { useState, useEffect } from 'react'
import useWindowSize from '../../../../hooks/useWindowSize'
import { CircularProgress, Chip, Avatar, IconButton, Button, TextField } from '@mui/material';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, Menu, MenuItem, } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';


const Vote = (props) => {

  const [ width, ] = useWindowSize()

  const navigate = useNavigate()

  const [upVoteCount, setUpvoteCount] = useState(props.upVoteCount)
  const [downVoteCount, setDownVoteCount] = useState(props.downVoteCount)
  
  const [readerUpvoted, setReaderUpvoted ] = useState(props.readerUpvoted)

  let commentsCount = props.commentsCount

  const postID = props.postID 

  const ADD_CONTENT_QUERY = gql`
    mutation AddContent($contentInput:ContentInput) {
        addContent(contentInput:$contentInput)
    }
  `;

  const [ doAddContent,{ data, loading, error }] = useMutation(
    ADD_CONTENT_QUERY, { fetchPolicy: "network-only" }
  )

  const onUpvoteClick = (vote) => {

    let operation = null
    let upvote = null

    if(readerUpvoted == null){
            
      if(vote == "up"){
        setUpvoteCount(upVoteCount+1)
        setReaderUpvoted(true)
        operation = "ADD"
        upvote = true
      }

      if(vote == "down"){
        setDownVoteCount(downVoteCount + 1)
        setReaderUpvoted(false)
        operation = "ADD"
        upvote = false
      }

    }

    if(readerUpvoted != null){
      
      if(vote == "up" && readerUpvoted == true){
        setUpvoteCount(upVoteCount-1)
        setReaderUpvoted(null)
        operation = "DELETE"
        upvote = null

      }

      if(vote == "down" && readerUpvoted == false){
        setDownVoteCount(downVoteCount-1)
        setReaderUpvoted(null)
        operation = "DELETE"
        upvote = null

      }

      if(vote == "up" && readerUpvoted == false){
        setUpvoteCount(upVoteCount+1)
        setDownVoteCount(downVoteCount-1)
        setReaderUpvoted(true)
        operation = "ADD"
        upvote = true

      }

      if(vote == "down" && readerUpvoted == true){
        setUpvoteCount(upVoteCount-1)
        setDownVoteCount(downVoteCount+1)
        setReaderUpvoted(false)
        operation = "ADD"
        upvote = false

      }


    }

    

    doAddContent({
      variables:{
        contentInput:{
          type:"UPVOTE",
          operation: operation,
          voteInput:{ 
            postId:postID, 
            upvote: upvote 
          }
        }
      },
      fetchPolicy:"network-only"
    })

  }



  if(data){
    console.log("data",data)
  }

 

  const getDesktopView = () => { 

    return <div>
            <div style={{ display:"flex", border:"1px solid #fff",  paddingLeft:10, paddingRight:10, fontSize:14}}>
                <div style={{padding:5}}>
                  <Button
                    size="small" variant='text'
                    onClick={() => {onUpvoteClick("up")}}
                    style={{textTransform:"none", color:"#595959"}}
                    startIcon={
                      (readerUpvoted != null)?
                      readerUpvoted == true?<ThumbUpIcon />:<ThumbUpOffAltIcon />
                      :<ThumbUpOffAltIcon />
                    }
                  >
                    Up ({upVoteCount})
                  </Button>
                  
                </div>
                <div style={{padding:5}}>
                <Button
                    size="small" variant='text'
                    onClick={() => {onUpvoteClick("down")}}
                    style={{textTransform:"none", color:"#595959"}}
                    startIcon={
                      (readerUpvoted != null)?
                       readerUpvoted == false?<ThumbDownIcon />:<ThumbDownOffAltIcon />
                      :<ThumbDownOffAltIcon />
                    }
                  >
                    Down ({downVoteCount})
                  </Button>
                </div>
                <div style={{flexGrow:1}}></div>
                <div style={{padding:5}}>
                <Button
                    onClick={
                      ()=>{
                        navigate("/post/"+postID,{state:props.searchFilter})
                      }
                    }
                    size="small" variant='text'
                    style={{textTransform:"none", color:"#595959"}}
                    startIcon={<CommentIcon />}
                  >
                   Comments ({commentsCount})
                  </Button>
                </div>
            </div>
          </div>

  }


  const getMobileView = () => {  

    return <div>
      <div style={{ display:"flex", border:"1px solid #fff",  paddingLeft:5, paddingRight:5, fontSize:14}}>
          <div style={{padding:5}}>
            <Button
              onClick={() => {onUpvoteClick("up")}}
              size="small" variant='text'
              style={{textTransform:"none", color:"#595959"}}
              startIcon={
                (readerUpvoted != null)?
                readerUpvoted == true?<ThumbUpIcon />:<ThumbUpOffAltIcon />
                :<ThumbUpOffAltIcon />
              }
              >
              ({upVoteCount})
            </Button>
          </div>
          <div style={{padding:5}}>
            <Button
              onClick={() => {onUpvoteClick("down")}}
              size="small" variant='text'
              style={{textTransform:"none", color:"#595959"}}
              startIcon={
                (readerUpvoted != null)?
                 readerUpvoted == false?<ThumbDownIcon />:<ThumbDownOffAltIcon />
                :<ThumbDownOffAltIcon />
              }
              >
              ({downVoteCount})
            </Button>
          </div>
          <div style={{flexGrow:1}}></div>
          <div style={{padding:5}}>
          <Button
              onClick={
                ()=>{
                  navigate("/post/"+postID)
                }
              }
              size="small"
              variant='text'
              style={{textTransform:"none", color:"#595959"}}
              startIcon={<CommentIcon />}
            >
              ({commentsCount})
          </Button>
            
          </div>
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

export default Vote