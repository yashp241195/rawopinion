import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Grid, IconButton } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Link, useLocation, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import appmodeVar from '../../vars/appmodeVar';
import { useReactiveVar } from '@apollo/client';


const Profile = (props) => {

  const [width, ] = useWindowSize()

  const location = useLocation()

  const appmode = useReactiveVar(appmodeVar)


  const profileoptions = [
    { name: "Saved Jobs", url: "/work/jobs/saved", icon: <BookmarkBorderIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Applied Jobs", url: "/work/jobs/applied", icon: <CheckCircleIcon sx={{ fontSize: 24 }} />, state: false },
    { name: "Shortlisted", url: "/work/jobs/shortlisted", icon: <FilterListIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Selected", url: "/work/jobs/selected", icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Rejected", url: "/work/jobs/rejected", icon: <CloseIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "My Work History", url: "/work/jobs/history", icon: <WorkHistoryIcon sx={{ fontSize: 28 }} />, state: false },
  ]


  const getDesktopView = () => {
    return <Grid container>
            <Grid item xs={3} style={{ marginLeft:30, height:"75vh",  }} >
              {(appmode === "RECRUIT")?<Navigate to={"/recruit/jobs/posted"} />:<></>}

              <List dense={true}>
              { 
                profileoptions.map((item, i)=>{
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
                <Link style={{ textDecoration: "none", color: "#000" }} to={"/work/options"}>
                  <IconButton>
                    <ArrowBackIcon style={{fontSize:22, color:"#000"}} />
                  </IconButton>
                </Link>
                </div>
                <div style={{fontSize:22, padding:10, }}>
                {profileoptions.filter(item=>item.url === location.pathname)[0].name}
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