import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Grid, IconButton } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import { Link, useLocation, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BusinessIcon from '@mui/icons-material/Business';
import appmodeVar from '../../vars/appmodeVar';
import { useReactiveVar } from '@apollo/client';


const Profile = (props) => {

  const [width, ] = useWindowSize()
  const location = useLocation()

  const appmode = useReactiveVar(appmodeVar)

  const recruitoptions = [
    { name: "Saved People",  url: "/recruit/saved/people", icon: <BookmarkBorder />, state: false },
    { name: "Jobs Posted", url: "/recruit/jobs/posted", icon: <WorkHistoryIcon />, state: false },
    { name: "Company Joined", url: "/recruit/company/joined", icon: <BusinessIcon />, state: false },
  ]

  const recruitoptions2 = [
    { name: "Create a Job", url: "/recruit/create/job", icon: <AddCircleOutlineIcon />, state: false },
    { name: "Create Company", url: "/recruit/create/company", icon: <AddBusinessIcon />, state: false },
  ]

  const getDesktopView = () => {
    return <Grid container>
            {(appmode === "JOB_SEARCH")?<Navigate to={"/work/jobs/saved"} />:<></>}
            <Grid item xs={3} style={{ marginLeft:30, height:"75vh",  }} >
              <List  dense={true}>
                { 
                  recruitoptions.map((item, i)=>{
                    const { name, url, icon, state } = item
                    const color = (location.pathname === url) ? "#3B3B3B" : "#979797"

                    return <div key={i}>
                            <Link style={{ textDecoration: "none", color: color }} to={url}>
                            <ListItemButton>
                                <ListItem>
                                  <ListItemIcon>
                                    {icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={name}
                                  />
                                </ListItem>
                            </ListItemButton>
                            </Link>
                          </div>
                  }) 
                }
              </List>
              <div style={{ display:"flex", justifyContent:"center", paddingTop:30, paddingBottom:20,  }}>
                <div style={{width:"70%", fontSize:18, color:"#595959"}}>
                  Create New
                </div>
              </div>
              <List dense={true}>
              { 
                recruitoptions2.map((item, i)=>{
                  const { name, url, icon, state } = item
                  const color = (location.pathname === url) ? "#3B3B3B" : "#979797"

                  return <div key={i}>
                          <Link style={{ textDecoration: "none", color: color }} to={url}>
                          <ListItemButton>
                              <ListItem>
                                <ListItemIcon>
                                  {icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={name}
                                />
                              </ListItem>
                          </ListItemButton>
                          </Link>
                        </div>
                }) 
              }
              </List>
            </Grid>
            <Grid item xs={8} style={{ paddingLeft:10 ,height:"75vh", overflowY:"auto" }} >
              {props.children}
            </Grid>
          </Grid>
  }

  const getMobileView = () => {
    return <div style={{width:"100%",  padding:10, }}>
            <div style={{ display:"flex", paddingBottom:5  }}>
                <div style={{padding:5}}>
                <Link style={{ textDecoration: "none", color: "#000" }} to={"/recruit/options"}>
                  <IconButton>
                    <ArrowBackIcon style={{fontSize:22, color:"#000"}} />
                  </IconButton>
                </Link>
                </div>
                <div style={{fontSize:22, padding:10, }}>
                  {
                    recruitoptions.filter(item=>item.url === location.pathname)[0]
                    ?
                    recruitoptions.filter(item=>item.url === location.pathname)[0].name
                    :
                    recruitoptions2.filter(item=>item.url === location.pathname)[0].name
                  }
                </div>
            </div>
            <div style={{ height:"85vh",  }}>
              {props.children}
            </div>
          </div>
  }

  return (
    <div style={{display:"flex", }}>
        {(width>800)?getDesktopView():<></>}
        {(width<800)?getMobileView():<></>}
    </div>
  )
}

export default Profile