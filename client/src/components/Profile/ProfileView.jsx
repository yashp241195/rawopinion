import React, { useState, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {
  IconButton, Chip, 
  Button, CircularProgress,
  Pagination, Skeleton, 
  Avatar, Tabs, Tab
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { gql, } from '@apollo/client';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import FilterView from './../../components/EditImage/FilterView'
import EditNoteIcon from '@mui/icons-material/EditNote';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Box from '@mui/material/Box';
import Posts from './ProfileView/Posts'
import Followers from './ProfileView/Followers'
import Comments from './ProfileView/Comments';

import millify from "millify";



const ProfileView = (props) => {

  const [width] = useWindowSize()

  const [profileView, setProfileView] = useState(null)

  const [followAction, setFollowAction] = useState(false)
  const [blockAction, setBlockAction] = useState(false)
  
  const { username, option, pageNo } = useParams()
  
  const location = useLocation()
  console.log("searchTerm 2",location.state)


  const navigate = useNavigate()

  const [value, setValue] = React.useState(option);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(props.viewType == "view"){
      navigate("/profile/view/"+username+"/"+newValue+"/1")
    }
    if(props.viewType == "show"){
      navigate("/profile/show/"+newValue+"/1")
    }
  };

  useEffect(()=>{
    if(value == null){
      
      if(viewType=="view"){
        setValue("overview")
        navigate("/profile/view/"+username+"/overview/1")
      }
      if(viewType=="show"){
        setValue("overview")
        navigate("/profile/show/overview/1")
      }
    }
  },[ value ])

  const locationPath = useLocation()

  const SEND_REQUEST = gql`

    mutation SendRequest($publicUsername:String,$type:String){
      sendRequest(publicUsername:$publicUsername,type:$type)
    }
      
  `

  const GET_PROFILE_VIEW = gql`
    query GetProfileView($username:String,$view:String){
      getProfileView(username:$username,view:$view){
        firstname lastname username
        publicUsername 
        location
        bio
        isMe isFollowByMe isBlockedByMe
        followersCount
        profilePic{
          imgid url icon_url 
          identifiedAs filter 
          isProfileSafe isSafe
          neutral porn drawing sexy hentai
        }
      }
    }
  `


  const [ loadProfile, { data, loading, error }] = useLazyQuery(GET_PROFILE_VIEW, { variables: { username: null, view: "main" }, fetchPolicy: "network-only" })
  
  const [ sendRequest, { data:data1, loading:loading1, error:error1 }] = useMutation(SEND_REQUEST, { variables: { publicUsername:"",type:"" }, fetchPolicy: "network-only" })


  useEffect(()=>{

      if(data && data.getProfileView){

        let followType = "FOLLOW"

        if(followAction){
          followType = "FOLLOW"
        }else{
          followType = "UNFOLLOW"
        }

        sendRequest({
          variables:{
            publicUsername: username,
            type: followType
          },
          fetchPolicy:"network-only"
        })

      }

  },[ followAction ])


  useEffect(()=>{

      if(data && data.getProfileView){

        let blockType = "BLOCK"

        if(blockAction){
          blockType = "BLOCK"
        }else{
          blockType = "UNBLOCK"
        }

        sendRequest({
          variables:{
            publicUsername: username,
            type:blockType
          },
          fetchPolicy:"network-only"
        })

      }

  },[ blockAction ])

  

  useEffect(()=>{
    
    loadProfile(
      { 
        variables: { 
          username: username ? username:null, 
          view: "main" 
        }
      }
    )

  },[loadProfile, username])

  if (data) {
    if (!profileView) {
      setProfileView(data.getProfileView)
      if(data.getProfileView.isFollowByMe == "YES"){
        setFollowAction(true)
      }
      if(data.getProfileView.isBlockedByMe == "YES"){
        setBlockAction(true)
      }
    }
  }

  if (error) { console.log("error", error) }
  if (loading) { console.log("loading", loading) }



  const mainViewDesktop = () => {
    
    if (profileView) {

      const {
        publicUsername, firstname, lastname,
        followersCount, profilePic, isMe,
        isFollowByMe, isBlockedByMe,
        location, bio
      } = data.getProfileView

      return <div style={{ width: 520, height: "68vh", overflowY:"hidden", border: "1px solid #efefef", borderRadius: 5 }}>
          <div style={{ width:520,  overflowX:"hidden" }}>
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab style={{textTransform:"none"}} value="overview" label="Overview" />
                <Tab style={{textTransform:"none"}} value="posts" label="Posts" />
                {
                  props.viewType == "show"?
                  <Tab style={{textTransform:"none"}} value="comments" label="Comments" />
                  :<></>
                }
                {
                  props.viewType == "view"?
                  <Tab style={{textTransform:"none"}} value="followers" label="Followers" />
                  :<></>
                }

              </Tabs>
            </Box>
            <div style={{border:"1px solid #fff", width:510, height:"60vh", borderRadius:5}}>
              {
                value == "overview"?
                <div>
                  <div>
                    <div style={{ paddingTop: 20, fontFamily: "sans-serif", fontSize: "1rem", padding: 10 }}>
                      <div style={{ display: "flex", width: 450, paddingLeft: 10, border: "1px solid #fff" }} >
                        <div style={{ height: 80, paddingTop: 25, paddingLeft:5 }}>
                          <div style={{ display: "flex", width: 80, justifyContent: "center", }}>
                            <Avatar variant="round" sx={{ height: 70, width: 70 }} >
                              {
                                profilePic?
                                <FilterView
                                filter={profilePic.filter}
                                image={profilePic.url} 
                                />
                                :
                                <AccountCircleIcon sx={{fontSize:82}} />
                              }
                            </Avatar>
                          </div>
                        </div>
                        <div style={{ width: 480, paddingLeft: 0, paddingTop: 20, }}>
                          <div style={{ display: "flex", fontSize: 18, paddingLeft: 5, paddingTop:15 }}>
                            <div style={{ fontFamily: "sans-serif" }}>
                              {firstname} {lastname}
                            </div>
                            <div style={{ fontSize: 14, paddingLeft: 5, paddingTop: 2, color: "#000" }}>
                              <Link style={{ textDecoration:"none", color:"#5D3FD3" }} to={"/profile/view/"+publicUsername+"/overview"}>
                                @{publicUsername.substring(0,12)}
                                {(publicUsername.length > 12)?"..":""}
                              </Link>
                            </div>
                          </div>
                          <div>
                          </div>
                          <div style={{ fontSize: 14, paddingLeft: 5, }}>
                            <div style={{ paddingTop: 0, paddingLeft: 5, display: "flex", fontFamily: "sans-serif" }}>
                            </div>
                            {
                              isMe == "NO" && username?
                              <div style={{ display:"flex", fontSize: 12, paddingTop: 5, color: "#000" }}>
                              <div>
                                <Link to={"/message/"+publicUsername}>
                                  <Button sx={{ textTransform:"none", color:"#595959", border:"1px solid #efefef" }} size="small" variant='outlined'>Message</Button>
                                </Link>
                              </div>
                              <div style={{paddingLeft:5 }}>
                                {
                                  followAction?
                                    <Button onClick={()=>{setFollowAction(false)}} sx={{ textTransform:"none", background:"#000"  }} size="small" variant='contained'>Following</Button>
                                    :
                                    <Button onClick={()=>{setFollowAction(true)}} sx={{ textTransform:"none", border:"1px solid #efefef" }} size="small" variant='outlined'>Follow</Button>
                                }
                              </div>
                              <div style={{paddingLeft:5 }}>
                                {
                                  blockAction?
                                    <Button onClick={()=>{setBlockAction(false)}} sx={{ textTransform:"none",  }} size="small" color="error"  variant='contained'>Blocked</Button>
                                    :
                                    <Button onClick={()=>{setBlockAction(true)}} sx={{ textTransform:"none", border:"1px solid #efefef" }} size="small" color="error" variant='outlined'>Block</Button>
                                }                    
                                </div>
                              </div>
                              :<></>
                            }

                          </div>
                        </div>
                      </div>
                      
                      <div 
                        style={{
                          paddingTop: 0, paddingLeft: 20,
                          display: "flex", justifyContent: "left",
                          fontSize: 14, fontFamily: "sans-serif", 
                          color: "#000", border:"1px solid #fff"
                        }}>
                          <div style={{ width:120, fontWeight:"bold" }}>
                            {location}
                          </div>
                          
                      </div>
                      <div 
                        style={{
                          paddingTop: 5, paddingLeft: 20,
                          display: "flex", justifyContent: "left",
                          fontSize: 14, fontFamily: "sans-serif", 
                          color: "#000", border:"1px solid #fff"
                        }}>
                          <div style={{ width:80 }}>
                              <b>{millify(3000)}</b> posts
                          </div>
                          <div style={{ width:100 }}>
                            <b>{millify(10000000)}</b> followers
                          </div>
                          <div style={{ width:100 }}>
                            <b>{millify(1000)}</b> following
                          </div>
                          
                      </div>
                      <div style={{ fontSize:14, paddingLeft: 20, paddingTop: 10 }}>
                        {bio}
                      </div>
                      <div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                :""
              }

              {
                value == "posts" && data.getProfileView.isBlockedByMe == "NO"?
                <div  style={{ width:"100%", border:"1px solid #fff" }}>
                  <div style={{  width:"100%",  border:"1px solid #fff",}}>
                    <Posts username={username} />
                  </div>
                </div>
                :""
              }

              {
                value == "comments"?
                <div  style={{ width:"100%", border:"1px solid #fff" }}>
                  <div style={{  width:"100%",  border:"1px solid #fff", }}>
                    <Comments />
                  </div>
                </div>
                :""
              }  

              {
                value == "followers" && data.getProfileView.isBlockedByMe == "NO"?
                <div  style={{ width:"100%",  border:"1px solid #fff" }}>
                  <div style={{  border:"1px solid #fff",  }}>
                    <Followers />
                  </div>
                </div>
                :""
              }


            </div>
          </div>
      </div>

    }

    return <div></div>

  }

  const mainViewMobile = () => {

    if (profileView) {

      const {
        publicUsername, firstname, lastname, bio,
        followersCount, profilePic, location
      } = data.getProfileView


      return <div style={{ marginTop: 10, display: "flex", flexDirection: "column", border: "1px solid #fff", height: "70vh", width: 280, borderRadius: 5 }}>
        <div style={{}}>
          <div style={{ paddingTop: 20, fontFamily: "sans-serif", fontSize: "1rem", padding: 10 }}>
            <div>
              <div style={{ display: "flex", width: 280, }} >
                <div style={{ width: 100, paddingTop: 10, }}>
                  <div style={{ display: "flex", justifyContent: "center", }}>
                    <Avatar variant="round" sx={{ height: 72, width: 72 }} >
                      {
                        profilePic?
                        <FilterView
                        filter={profilePic.filter}
                        image={profilePic.url} 
                        />:
                        <AccountCircleIcon sx={{fontSize:82}} />
                      }
                    </Avatar>
                  </div>
                  <div style={{ marginLeft: 5, paddingTop: 10, fontSize: 14, fontFamily: "sans-serif", fontWeight: "bold", color: "#0047AB" }}>
                    @{publicUsername}
                  </div>
                  <div style={{ marginLeft: 5, paddingTop: 5, fontSize: 14, fontFamily: "sans-serif", color: "#000" }}>
                    {location}
                  </div>
                </div>
                <div style={{ paddingLeft: 0, paddingTop: 10, }}>
                  <div style={{ display: "flex", fontSize: "1.2rem", paddingLeft: 5 }}>
                    <div style={{ fontFamily: "sans-serif" }}>
                      {firstname} {lastname}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, paddingLeft: 5, }}>
                    <div style={{ paddingTop: 5, paddingLeft: 5, display: "flex", fontFamily: "sans-serif" }}>
                      <div style={{ fontSize: 14, paddingTop: 2, color: "#000" }}>
                        {followersCount ? millify(followersCount) : 0} followers
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div style={{ paddingLeft: 5, paddingTop: 5 }}>
              {bio}
            </div>
          </div> 
          
          


        </div>

      </div>
    }
    else {
      return <div>

      </div>
    }
  }

  const getMobileView = () => {
    return <div style={{ display: "flex", flexDirection: "column", }}>
      <div style={{ flexGrow: 1 }}></div>
      {
        locationPath && locationPath.pathname != "/explore" && props && props.username ?
          <div style={{ fontSize: 22, padding: 10, paddingBottom: 15, }}>
            <Button 
            onClick={()=>{ navigate(-1) }}
            sx={{ textTransform: "none", color: "#595959" }} startIcon={<ArrowBackIcon />} >
              back
            </Button>
          </div>
          :
          <div style={{}}></div>
      }
      <div style={{ display: "flex", justifyContent: "center" }} >
        {mainViewMobile()}
      </div>
    </div>
  }

  const getDesktopView = () => {
    return <div style={{ display: "flex", justifyContent: "left", border:"1px solid #fff", }}>
      <div style={{ display: "flex", justifyContent: "left", border:"1px solid #fff", }}>
        
        <div style={{}}>
          {
            props && props.username ?
              <div style={{ height: 50, }}>
                  <Button 
                    onClick={()=>{ 
                      console.log("location.state",location.state)
                      if(location && location.state && location.state.searchType){
                        navigate(`/explore/${location.state.section}/${location.state.searchType}/1`, { state: location.state });
                      }
                      if(location && location.state == null){
                        navigate(-1)
                      }
                    }}
                    sx={{ textTransform: "none", color: "#595959" }} 
                    startIcon={<ArrowBackIcon />} >
                    back
                  </Button>
              </div>
              :
              <div style={{ display: "flex", fontSize: 22, padding: 10, paddingLeft: 5, paddingBottom: 15, }}>
              </div>
          }
          <div>
            { profileView ? 
                mainViewDesktop()
              : 
              <div style={{
                width:400, height:"40vh", 
                border:"1px solid #fff",
                display:"flex",flexDirection:"column",
                justifyContent:"center"
              }}>
                <div style={{border:"1px solid #fff", display:"flex", justifyContent:"center"}}>
                  <div style={{width:300}}>
                    {
                      error && error.message == "essentials not found"?
                        <div>
                          Please fill essential details <br/>
                          Click 
                          <span style={{paddingLeft:5,paddingRight:5}}>
                          <Link style={{textDecoration:"underline",}} to="/profile/user/edit/profile">here</Link> 
                          </span>
                          to edit profile 
                        </div>
                        :
                        ""
                    }
                    {
                      error && error.message == "public profile not found"?
                        "Public profile not found"
                        :
                        ""
                    }
                  </div>
                </div>
              </div> 
            }
          </div>

        </div>
      </div>
    </div>
  }


  return (
    <div style={{}}>
      {
        !loading ?
          <div style={{}}>
            {(width > 600 ? getDesktopView() : <></>)}
            {(width < 600 ? getMobileView() : <></>)}
          </div>
          :
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "65vh" }}>
            <div style={{ display: "flex", justifyContent: "center", paddingBottom: 15, }}>
              <CircularProgress />
            </div>
          </div>
      }
    </div>
  )
}

export default ProfileView