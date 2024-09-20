import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { CircularProgress, Chip, Avatar } from '@mui/material';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';


const Post = () => {

  const [ width, ] = useWindowSize()

  const GET_POST_QUERY = gql`
    query GetPost($postId:String){
      getPost(postId:$postId){
        personPublicUsername 
        title
        content{
          text
        }
        upvoteCount downvoteCount
        timestamp
        
      }
    }

  `

  const { data, loading, error } = useQuery(GET_POST_QUERY, { fetchPolicy: "network-only" })


  if(data){
    // console.log("data",data)
  }

  const getDesktopView = () => {

    const {
        postId,
        postedBy,
        postedByName, 
        userImage, 
        verifiedUser,
        postTitle, postContent, 
        postImage,
        upvoteCount, downvoteCount, ContextOutCount,
        onBlockchain, blockchainId,
    
    } = data.getPost
  

    return <div style={{ padding:15, fontFamily:"sans-serif"}}>
      <div style={{display:"flex",  paddingLeft:10, paddingRight:10 }}>
        <div style={{fontSize:"1rem"}}>
          {postTitle} 
          <div style={{ fontSize:"0.8rem", display:"flex",  }}>
            13 Jan, 2024
          </div>
        </div>
        <div>
          {onBlockchain? <CurrencyBitcoinIcon sx={{ fontSize: "2rem", color: "#595959" }} /> : <></>}
        </div>
      </div>
      <div style={{display:"flex", padding:10}}>
        <div>
          <Avatar sx={{height:40, width:40}} src={userImage.icon_url} />
        </div>
        <div style={{display:"flex", flexDirection:"column", paddingLeft:10, paddingRight:10}} >
          <div style={{ fontSize:"0.8rem"}} >
          {postedByName}
          </div>
          <div style={{ fontSize:"0.8rem"}}>
          {postedBy}
          </div>
        </div>
        <div style={{ padding:5 }}>
          {verifiedUser? <VerifiedUserIcon sx={{ fontSize: "1.2rem", color: "green" }} /> : <></>}
        </div>
        <div style={{flexGrow:1}}></div>
        <div style={{ fontSize:"0.8rem", }}>
          <div style={{ display:"flex", justifyContent:"end" }}>
            {upvoteCount} upvotes
          </div>
          <div style={{ display:"flex", justifyContent:"end" }}>
            {downvoteCount} downvotes
          </div>
        </div>
        <div style={{ fontSize:"0.8rem", paddingLeft:10  }}>
          <div style={{ display:"flex", justifyContent:"end" }}>
            {ContextOutCount} contextout
          </div>
          <div style={{ display:"flex", justifyContent:"end" }}>
            22 comments
          </div>
        </div>
        <div style={{flexGrow:1}}></div>
      </div>
      <div style={{display:"flex", }}>
        <div style={{paddingLeft:12,paddingTop:10 }}>
          <Avatar sx={{height:380, width:380}} variant="rounded" src={postImage.url} />
        </div>
      </div>
      <div style={{ fontSize:"0.95rem", padding:5, paddingTop:15, paddingLeft:15 }}>
        {postContent}
      </div>
    </div>
  }

  const getMobileView = () => {
    return <div></div>
  }

  return (
    <div>
      {
        !loading ?
          <div>
            {/* {(width > 800 ? getDesktopView() : <></>)} */}
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

export default Post