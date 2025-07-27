import React, {useState, useEffect} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { CircularProgress, Chip, Avatar, IconButton, Button, TextField } from '@mui/material';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, Menu, MenuItem,  } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import { Link,  } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Vote from './Vote';
import Comment from './Comment';

const Post = (props) => {

  const navigate = useNavigate()

  const [ width, ] = useWindowSize()
  const { postId:pid, commentId:cId } = useParams()

  const visibility = props.visibility

  const [post, setPost] = useState(null)
  const [postID, setPostID] = useState(null)
  const [ selectedAIAnalysis, setSelectedAIAnalysis ] = useState("")

  const GET_POST_QUERY = gql`
    query GetContent($contentInput:ContentInput){
      getContent(contentInput:$contentInput){
        post{
          publicUsername
          profilePicIcon
          text
          textAIAnalysis
          timestamp
          image{
            imgid url icon_url thumb_url 
            identifiedAs isSafe
          }
          upvoteCount
          downvoteCount
          commentsCount
          readerPicIcon 
          readerPublicUsername
          readerUpvoted

        } 
      }
    }
  `;

  const [ doloadPost,{ data, loading, error }] = useLazyQuery(
    GET_POST_QUERY, { fetchPolicy: "network-only" }
  )

  useEffect(()=>{ if(pid){ setPostID(pid) } },[pid])

  useEffect(()=>{

    if(postID){

      doloadPost({
        variables:{
          contentInput:{
            type:"POST",
            operation:"VIEW",
            postInput:{
              postId:postID
            }
          }
        },
        fetchPolicy: "network-only"
      })

    }
    

  }, [postID])


  // if(data){ console.log("data",data) }

  useEffect(()=>{
    if(data && data.getContent && data.getContent.post){ setPost(data.getContent.post) }
  },[data])



  const getDesktopView = () => {

    let ai_analysis = null
    
    if(post){ ai_analysis = JSON.parse(post.textAIAnalysis).content_analysis; }

    return <div style={{ display:"flex", height:"80vh", flexDirection:"column", justifyContent:"center", padding:15, fontFamily:"sans-serif", border:"1px solid #fff"}}>
      <div style={{paddingLeft:20}}>
        <Button 
          onClick={()=>{ 
            navigate(-1)
          }}
          sx={{ textTransform: "none", color: "#595959" }} 
          startIcon={<ArrowBackIcon />} >
            back
        </Button>
      </div>
      {
        post?
            <div style={{ border:"1px solid #fff", height:"100%", overflowY:"auto",  width:"90%", display:"flex", justifyContent:"left" }}>
              
              <div style={{ border:"1px solid #fff", padding:15, borderRadius:5, fontFamily:"sans-serif",  width:450}}>
                
                <div style={{ border:"1px solid #efefef", borderRadius:5}}>
                  
                  <Link style={{ textDecoration:"none", color:"black" }} to={"/profile/view/" + post.publicUsername}>
                    <div style={{display:"flex", padding:15, border:"1px solid #fff"}}>
                      <div>
                        <Avatar sx={{height:40, width:40}} src={post.profilePicIcon} />
                      </div>
                      <div style={{display:"flex", flexDirection:"column", paddingLeft:10, paddingRight:10}} >
                        <div style={{ fontSize:"0.9rem", fontFamily:"sans-serif", paddingTop:5,  }} >
                          {post.publicUsername}
                        </div>
                        <div style={{ fontSize:"0.8rem"}}>
                          {post.timestamp}
                        </div>
                      </div>
                      <div style={{flexGrow:1}}></div>
                      <div style={{ padding:5 }}>
                      {
                        true? 
                          <CurrencyBitcoinIcon sx={{ fontSize: "1.6rem", color: "#595959" }} /> : <></>
                      }
                      
                      </div>
                    </div>
                  </Link>

                  <div>
                    {
                      (post.publicUsername == post.readerPublicUsername)?
                        <div style={{paddingLeft:10}}>
                          <Button size="small"
                          onClick={()=>{navigate("/add/edit/"+postID)}}
                          style={{textTransform:"none", fontSize:16}}
                          endIcon={<EditIcon sx={{fontSize:14}}/>}>
                            Edit
                          </Button>
                        </div>
                        :""
                    }
                  </div>
                  <div style={{display:"flex", }}>
                      {post.image?
                        <div style={{paddingLeft:12, paddingRight:0, paddingTop:10 }}>
                          <Avatar sx={{height:200, width:200}} variant="rounded" src={post.image.thumb_url} />
                        </div>
                      :""}
    
                    <div style={{ whiteSpace: 'pre-line' , padding:15, fontSize:16, width:300 }}>
                      {post.text}
                    </div>
                  </div>
                  <div style={{ fontSize:"0.95rem", padding:10,  }}>
                    {
                      ai_analysis && ai_analysis.map(
                        (it,i)=> <div key={i}>
                              <div>
                                <Chip onClick={()=>{setSelectedAIAnalysis(it.issue_type)}}
                                  size="small" style={{ color:"#fff", border:"1px solid #fff", background:"#ff0000"}} label={it.issue_type} variant="outlined" />
                              </div>
                              <div style={{fontSize:12, paddingTop:5, color:"red"}}>
                                {selectedAIAnalysis == it.issue_type?it.description:""}
                              </div>
                              <div style={{fontSize:12, paddingTop:5, color:"blue"}}>
                              </div>
                              </div>
                      )
                    }
                  </div>
                  <div style={{padding:2}}>
                    <Vote 
                      upVoteCount={post.upvoteCount}
                      downVoteCount={post.downvoteCount}
                      commentsCount={post.commentsCount}
                      readerUpvoted={post.readerUpvoted} 
                      hasReaderUpvoted={post.readerUpvoted == null?false:true} 
                      postID={postID} 
                    />
                  </div>
                </div>
                  {
                    visibility == "public"?"":
                    <Comment 
                      postID={postID}
                      filterCommentId={cId}
                      readerPublicUsername={post.readerPublicUsername} 
                      readerPicIcon={post.readerPicIcon} 
                    />
                  }
                
            </div>
          </div>
        :
        <div style={{border:"1px solid #fff", display:"flex", justifyContent:"center", flexDirection:"column"}}>
          <div>
            Post not found
          </div>
        </div>
      }

    </div>
  }

  const getMobileView = () => {

    let ai_analysis = null
    if(post){
      ai_analysis = JSON.parse(post.textAIAnalysis).content_analysis;
    }

    return <div style={{ display:"flex", height:"75vh" , justifyContent:"center" ,padding:15, fontFamily:"sans-serif", border:"1px solid #fff"}}>
    {
      post?
        <div style={{ padding:15, borderRadius:5, fontFamily:"sans-serif", border:"1px solid #efefef", width:"90%", overflowY:"auto"}}>
        <div style={{display:"flex", padding:10, border:"1px solid #fff"}}>
          <div>
            <Avatar sx={{height:40, width:40}} src={post.profilePicIcon} />
          </div>
          <div style={{display:"flex", flexDirection:"column", paddingLeft:10, paddingRight:10}} >
            <div style={{ fontSize:"0.8rem", paddingTop:5, fontWeight:"bold"}} >
             {post.publicUsername}
            </div>
            <div style={{ fontSize:"0.8rem"}}>
              {post.timestamp}
            </div>
          </div>
          <div style={{flexGrow:1}}></div>
          <div style={{ padding:5 }}>
          {"onBlockchain"? <CurrencyBitcoinIcon sx={{ fontSize: "1.6rem", color: "#595959" }} /> : <></>}
          </div>
          
        </div>
        <div>
          {
            (post.publicUsername == post.readerPublicUsername)?
              <div style={{paddingLeft:10}}>
                <Button size="small"
                onClick={()=>{navigate("/add/edit/"+postID)}}
                style={{textTransform:"none", fontSize:16}}
                endIcon={<EditIcon sx={{fontSize:14}}/>}>
                  Edit
                </Button>
              </div>
              :""
          }
        </div>
        <div style={{display:"flex", flexDirection:"column" }}>
          <div style={{ paddingTop:10, display:"flex", justifyContent:"center", border:"1px solid #fff" }}>
          {post.image?
            <Avatar sx={{ height:"95%", width:"95%"}} variant="rounded" src={post.image.thumb_url} />
          :""}
            </div>
          <div style={{  whiteSpace: 'pre-line' , paddingTop:10, padding:10 }}>
            {post.text}
          </div>
        </div>
        <div style={{ fontSize:"0.95rem", padding:5, paddingTop:15, paddingLeft:10 }}>
          {
            ai_analysis && ai_analysis.map(
              (it,i)=> <div key={i}>
                    <div>
                      <Chip onClick={()=>{setSelectedAIAnalysis(it.issue_type)}}
                        size="small" style={{ color:"#fff", border:"1px solid #fff", background:"#ff0000"}} label={it.issue_type} variant="outlined" />
                    </div>
                    <div style={{fontSize:12, paddingTop:5, color:"red"}}>
                      {selectedAIAnalysis == it.issue_type?it.description:""}
                    </div>
                    <div style={{fontSize:12, paddingTop:5, color:"blue"}}>
                    </div>
                    </div>
            )
          }
        </div>
        
        <Vote 
            upVoteCount={post.upvoteCount}
            downVoteCount={post.downvoteCount}
            commentsCount={post.commentsCount}
            readerUpvoted={post.readerUpvoted} 
            hasReaderUpvoted={post.readerUpvoted == null?false:true} 
            postID={postID} 
        />
        {
          visibility == "public"?"":
          <Comment 
            postID={postID}
            filterCommentId={cId}
            readerPublicUsername={post.readerPublicUsername} 
            readerPicIcon={post.readerPicIcon} 
          />
        }        
      </div>
      :
      <div style={{border:"1px solid #fff", display:"flex", justifyContent:"center", flexDirection:"column"}}>
        <div>
          Post not found
        </div>
      </div>
    }

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

export default Post