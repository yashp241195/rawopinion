import React from 'react'
import { Link, useLocation } from "react-router-dom";
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import { Grid } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import appmodeVar from '../../vars/appmodeVar';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NavbarBottomAuth = () => {

  const appmode = useReactiveVar(appmodeVar)
  const currentpath = useLocation().pathname

  const wrapNav = (url, text, icon) => {
    const linkColor = (url === currentpath) ? "#000" : "#AEAEAE"
    return <div>
      <Link to={url} style={{ textDecoration: 'none', color: linkColor }}>
        <div style={{ display: "flex" }}>
          <div style={{ padding: 5 }}>
            {icon}
          </div>
          <div style={{ padding: 5 }}>
            {text}
          </div>
        </div>
      </Link>
    </div>
  }

  const wrapProfileNav = (url, text, icon) => {
    const linkColor = (url === currentpath) ? "#000" : "#AEAEAE"
    return <div>
      <Link to={url} style={{ textDecoration: 'none', color: linkColor }}>
        <div style={{ display: "flex" }}>
          <div style={{ padding: 5 }}>
            {icon}
          </div>
          <div style={{ paddingTop: 9 }}>
            {text}
          </div>
        </div>
      </Link>
    </div>
  }


  return (
    <div style={{paddingBottom:5}}>
      <Grid container >
        <Grid item xs={3} style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
          {wrapNav('/explore', '', <div style={{ paddingTop: 2, display: "flex" }}><ExploreIcon sx={{ fontSize: 28 }} /></div>)}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", justifyContent: "start", alignItems: "start",  }}>
          {wrapNav('/saved', '', <div style={{ paddingTop: 4, display: "flex" }}><BookmarkIcon sx={{ fontSize: 28 }} /></div>)}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
          {wrapNav('/add', '', <div style={{ paddingTop: 2, display: "flex" }}><AddIcon sx={{ fontSize: 28 }} /></div>)}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
          {wrapNav('/notification', '', <div style={{ paddingTop: 0, display: "flex" }}><NotificationsIcon sx={{ fontSize: 28 }} /></div>)}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
          {wrapProfileNav('/profile/options', '', <div style={{ paddingTop: 4 }}><AccountCircleIcon sx={{ fontSize: 28 }} /></div>)}
        </Grid>
      </Grid>
    </div>
  )
}

export default NavbarBottomAuth