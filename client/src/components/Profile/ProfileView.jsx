import React, { useState, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { IconButton, Chip, Button, CircularProgress, 
  Pagination, Skeleton, Avatar, Tabs, Tab } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLazyQuery, useQuery, } from '@apollo/client'
import { gql, } from '@apollo/client';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from "react-router-dom"
import FilterView from './../../components/EditImage/FilterView'
import EditNoteIcon from '@mui/icons-material/EditNote';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import millify from "millify";



const ProfileView = (props) => {

  const [width] = useWindowSize()

  const [tabValue, setTabValue] = useState(0)
  const [profileView, setProfileView] = useState(null)

  const [ postList , setPostList ] = useState([
    {name:"Hi1",},
    {name:"Hi2",},
    {name:"Hi3",},
    {name:"Hi4",},
    {name:"Hi1",},
    {name:"Hi2",},
    {name:"Hi3",},
    {name:"Hi4",},
    {name:"Hi1",},
    {name:"Hi2",},
    {name:"Hi3",},
    {name:"Hi4",},
  ])

  const [ activityList , setActivityList ] = useState([
    {name:"Hi21",},
    {name:"Hi22",},
    {name:"Hi23",},
    {name:"Hi24",},
    {name:"Hi21",},
    {name:"Hi22",},
    {name:"Hi23",},
    {name:"Hi24",},
    {name:"Hi21",},
    {name:"Hi22",},
    {name:"Hi23",},
    {name:"Hi24",},
  ])


  const locationPath = useLocation()


  const GET_PROFILE_VIEW = gql`
    query GetProfileView{
      getProfileView{
        public_username 
        username age 
        firstname lastname openfor
        bio contextoutCount downvotesCount 
        upvotesCount followersCount
        profilePic{
          imgid url icon_url 
          identifiedAs filter 
          isProfileSafe isSafe
          neutral porn drawing sexy hentai
        }
      }
    }
  `

  // const GET_SEARCH_RESULTS = gql`
  //   mutation GetSearchResults($searchInput:SearchInput){
  //     getSearchResults(SearchInput:$searchInput){
        
  //     }
  //   }

  // `


  const { data, loading, error } = useQuery(GET_PROFILE_VIEW, { fetchPolicy: "network-only" })

  // const [loadPosts,{ data:data1, loading:loading1, error:error1 }] = useLazyQuery(GET_PROFILE_VIEW, { fetchPolicy: "network-only" })


  if (data) {
    if (!profileView) {
      setProfileView(data.getProfileView)
    }
  }

  if (error) { console.log("error", error) }
  if(loading){ console.log("loading",loading) }

  const wrapChip = (text) => <Chip
    sx={{
      border: "1px solid #efefef",
      height: "auto",
      '& .MuiChip-label': {
        display: 'block',
        whiteSpace: 'normal',
      },
    }} 
    label={text} 
    size="small" variant="outlined" />


  const mainViewDesktop = () => {
    if (profileView) {

      const {
        public_username, firstname, lastname, openfor,
        bio, contextoutCount, downvotesCount, 
        upvotesCount, followersCount, profilePic
      } = data.getProfileView

      
      return <div style={{ width: 480, height:"50vh",  border: "1px solid #efefef", borderRadius:5}}>
                <div>
                  <div style={{ display: "flex", width:450, paddingLeft:10 }} >
                    <div style={{ height:120, paddingTop:17,  }}>
                          <div style={{display:"flex", width:130, justifyContent:"center",}}>
                            <Avatar variant="round" sx={{ height: 100, width: 100 }} >
                                <FilterView
                                  filter={profilePic.filter}
                                  image={profilePic.url} />
                            </Avatar>
                          </div>
                          <div style={{ paddingTop:10, 
                            display:"flex", justifyContent:"center",
                            fontSize:14, fontFamily:"sans-serif", fontWeight:"bold", color:"#0047AB"}}>
                              {public_username}
                          </div>
                    </div>
                    <div style={{ width: 480, paddingLeft: 0, paddingTop: 20, }}>
                      <div style={{ display:"flex", fontSize: 20, paddingLeft: 10 }}>
                        <div style={{ fontFamily:"sans-serif" }}>
                          {firstname} {lastname} 
                        </div>
                      </div>
                      <div style={{ fontSize: 14, paddingLeft: 5, }}>
                        <div style={{ paddingTop: 5, fontSize:14,  display:"flex" }}>
                          <div style={{marginLeft:0}}>
                            {openfor === "DISCUSSION"?wrapChip("Open for discussion"):<></>}
                          </div>
                        </div>
                        <div style={{
                          width:320, paddingTop: 10,  paddingBottom: 0, paddingLeft:5, 
                          fontSize:13, display:"flex", fontFamily:"sans-serif",  
                          }}>
                          <div>
                            {millify(upvotesCount)} Upvotes
                          </div>
                          <div style={{marginLeft:5}}>
                            {millify(downvotesCount)} Downvotes
                          </div>
                          <div style={{marginLeft:5}}>
                            {millify(contextoutCount)} Context Out
                          </div>
                        </div>
                        <div style={{ paddingTop: 0, paddingLeft:5, display:"flex", fontFamily:"sans-serif" }}>
                          <div style={{ fontSize:16, paddingTop: 5, color:"#000"}}>
                            {millify(followersCount)} followers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{
                      paddingTop:20,
                      display:"flex",
                      justifyContent:"center",
                      fontFamily: "sans-serif",
                      fontSize:14, color:"#000",
                    }}>
                      <div style={{
                        width:450, 
                        paddingBottom:30,
                        maxHeight:100, 
                        overflowY:"hidden"
                      }} 
                      >
                          
                        {bio}
                      </div>
                  </div>
                </div>
              </div>

    }

    return <div></div>

  }

  
  const mainViewMobile = () => {

    if (profileView) {

      const {
        public_username, firstname, lastname, openfor,
        bio, contextoutCount, downvotesCount, 
        upvotesCount, followersCount, profilePic
      } = data.getProfileView

      const {
        imgid, url, icon_url, 
        identifiedAs, filter, 
        isProfileSafe, isSafe,
        neutral, porn, drawing, sexy, hentai
      } = profilePic


      return <div style={{ marginTop:20, display: "flex", flexDirection: "column", border: "1px solid #efefef", height: "60vh", width: 280, borderRadius:5 }}>
        
        
        <div style={{}}>
          
          {
            tabValue === 0?
              <div>
                <div style={{ display: "flex", width:280, }} >
                  <div style={{ width: 100,  paddingTop:10, }}>
                        <div style={{display:"flex", justifyContent:"center", }}>
                          <Avatar variant="round" sx={{ height: 80, width: 80 }} >
                              <FilterView
                                filter={profilePic.filter}
                                image={profilePic.url} />
                          </Avatar>
                        </div>
                        <div style={{marginLeft:10, paddingTop:10, fontSize:14, fontFamily:"sans-serif", fontWeight:"bold", color:"#0047AB"}}>
                          {public_username}
                        </div>
                  </div>
                  <div style={{  paddingLeft: 0, paddingTop: 10, }}>
                    <div style={{ display:"flex", fontSize: "1.2rem", paddingLeft: 5 }}>
                      <div style={{ fontFamily:"sans-serif" }}>
                        {firstname} {lastname} 
                      </div>
                    </div>
                    <div style={{ fontSize: 14, paddingLeft: 5, }}>
                      <div style={{ paddingTop: 5, fontSize:14,  display:"flex" }}>
                        <div style={{marginLeft:0}}>
                          {openfor === "DISCUSSION"?wrapChip("Open for discussion"):<></>}
                        </div>
                      </div>
                      <div style={{ paddingTop: 5, paddingLeft:5, display:"flex", fontFamily:"sans-serif" }}>
                        <div style={{ fontSize:16, paddingTop: 5, color:"#000"}}>
                          {followersCount} followers
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div style={{
                    paddingTop:10,
                    display:"flex",
                    justifyContent:"center",
                    fontFamily: "sans-serif",
                    fontSize:14, color:"#000",
                  }}>
                    <div style={{  overflowY:"hidden"}} >
                        <div style={{
                          width:270, paddingTop: 5,  
                          paddingBottom: 10,
                          fontSize:13, display:"flex", fontFamily:"sans-serif",  }}>
                          <div style={{flexGrow:1 }} >
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"1.1rem"
                              }}>
                              {millify(upvotesCount)}
                            </div>
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"0.9rem"
                              }}>
                              Upvotes
                            </div>
                          </div>
                          <div style={{ flexGrow:1 }} >
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"1.1rem"
                              }}>
                              {millify(downvotesCount)} 
                            </div>
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"0.9rem"
                              }}>
                              Downvotes
                            </div>
                          </div>
                          <div style={{ flexGrow:1 }} >
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"1.1rem"
                              }}>
                              {millify(contextoutCount)}  
                            </div>
                            <div style={{ 
                              display:"flex", 
                              justifyContent:"center", 
                              fontSize:"0.9rem"
                              }}>
                              Context-out
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
                <div style={{ paddingTop:20, fontFamily:"sans-serif" ,fontSize:"1rem" ,padding:10 }}>
                  {bio}
                </div>
              </div>
            :<></>
          }
          {/* {
            tabValue === 1?
              <div style={{ display:"flex", justifyContent:"center", marginTop:5 }} >
                <div style={{display:"flex", justifyContent:"center", width:"96%", flexDirection:"column"}} >
                  <div style={{ width:"100%", height:"60vh", paddingTop:10, paddingBottom:10}} >
                      {postList && postList.length > 0 ?
                        <AutoSizer>
                          {({ width, height }) => (
                            <List
                              width={width * 1}
                              height={height}
                              rowCount={postList.length}
                              rowHeight={80}
                              rowRenderer={
                                ({
                                  key,
                                  index,
                                  style,
                                })=>{

                                  const { name } = postList[index]

                                  return <div key={key} style={{...style, border:"1px solid #efefef", padding:5, width:"90%", margin:5, height:62, borderRadius:5}}>
                                    name {name}
                                  </div>
                                }
                              }
                            />
                          )}
                        </AutoSizer>
                        :
                        <div style={{ display: "flex", justifyContent: "center", color: "#595959", fontSize: 20 }}>
                          You haven't posted anything yet.
                        </div>
                      }
                  </div>
                  {postList && postList.length > 0 ?
                    <div style={{height:"5vh", marginTop:5, paddingTop:5, display:"flex", justifyContent:"center" }}>
                      <Pagination size="small" count={10} color="primary" />
                    </div>
                    :<></>
                  }
                </div>
              </div>
              :<></>
          } */}
          {/* {
            tabValue === 2?
            <div style={{ display:"flex", justifyContent:"center", marginTop:5 }} >
                <div style={{display:"flex", justifyContent:"center", width:"96%", flexDirection:"column"}} >
                  <div style={{ width:"100%", height:"60vh", paddingTop:10, paddingBottom:10}} >
                      {activityList && activityList.length > 0 ?
                        <AutoSizer>
                          {({ width, height }) => (
                            <List
                              width={width * 1}
                              height={height}
                              rowCount={activityList.length}
                              rowHeight={80}
                              rowRenderer={
                                ({
                                  key,
                                  index,
                                  style,
                                })=>{

                                  const { name } = activityList[index]

                                  return <div key={key} style={{...style, border:"1px solid #efefef", padding:5, width:"90%", margin:5, height:62, borderRadius:5}}>
                                    name {name}
                                  </div>
                                }
                              }
                            />
                          )}
                        </AutoSizer>
                        :
                        <div style={{ display: "flex", justifyContent: "center", color: "#595959", fontSize: 20 }}>
                          You haven't done any activity yet.
                        </div>
                      }
                  </div>
                  {activityList && activityList.length > 0 ?
                    <div style={{height:"5vh", marginTop:5, paddingTop:5, display:"flex", justifyContent:"center" }}>
                      <Pagination size="small" count={10} color="primary" />
                    </div>
                    :<></>
                  }
                </div>
              </div>
              :<></>
          } */}

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
            <Link to={"/profile/matches"}>
              <Button sx={{ textTransform: "none", color: "#595959" }} startIcon={<ArrowBackIcon />} >
                back
              </Button>
            </Link>
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
    return <div style={{}}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{}}>
          {
            locationPath && locationPath.pathname != "/explore" && props && props.username ?
              <div style={{ height: 50, }}>
                <Link to={"/profile/matches"}>
                  <Button sx={{ textTransform: "none", color: "#595959" }} startIcon={<ArrowBackIcon />} >
                    back
                  </Button>
                </Link>
              </div>
              :
              <div style={{ display: "flex", fontSize: 22, padding: 10, paddingLeft: 5, paddingBottom: 15, }}>
                {locationPath && locationPath.pathname != "/explore" ? "My Profile" : ""}
              </div>
          }
          <div>
            {mainViewDesktop()}
          </div>
          
        </div>
      </div>
    </div>
  }


  return (
    <div style={{}}>
      {
        !loading ?
          <div style={{ }}>
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