import React,{useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BsMessenger } from 'react-icons/bs'
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Grid'
import useWindowSize from '../../hooks/useWindowSize';
import { useApolloClient, useMutation } from '@apollo/client';
import { gql, } from '@apollo/client';
import { APP_ICON } from '../../config/config';
import WorkIcon from '@mui/icons-material/Work';
import { Select, MenuItem, } from '@mui/material'
import appmodeVar from '../../vars/appmodeVar';
import { useReactiveVar } from '@apollo/client';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const NavbarAuth = () => {

  const appmode = useReactiveVar(appmodeVar)

  const [width,] = useWindowSize()
  const currentpath = useLocation().pathname
  const [ appMode, setAppMode ] = useState(appmode)

  const client = useApolloClient()
  const navigate = useNavigate()

  
  useEffect(()=>{
    if(localStorage.getItem("appmode")){
      appmodeVar(appMode)
      localStorage.setItem("appmode",appMode)
    }
  },[appMode])

  

  const DO_LOGOUT = gql`
    mutation Logout{
        logout
    }
  `;

  const [doLogout, { loading, error, data }] = useMutation(DO_LOGOUT, { fetchPolicy: "network-only" });

  if (data) {
    client.clearStore();
    localStorage.clear()
    navigate("/login")
  }

  if (error) {
    console.log("Error", error.message)
  }


  const imgurl = APP_ICON

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

  const wrapNotifyNav = (url, text, icon) => {
    const linkColor = (url === currentpath) ? "#000" : "#AEAEAE"
    return <div>
      <Link to={url} style={{ textDecoration: 'none', color: linkColor }}>
        <div style={{ display: "flex" }}>
          <div style={{ padding: 5 }}>
            {icon}
          </div>
          <div style={{ paddingTop: 7 }}>
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

  const wrapHead = (imgurl, url, text) => {
    return <Link to={url} style={{ textDecoration: 'none', color: "#000" }}>
      <div style={{ display: "flex",  }}>
        <div style={{ padding: 2, paddingTop: 9 }}>
          <img src={imgurl} alt={text} height="33" />
        </div>
        <div style={{ paddingTop: 10, paddingLeft:10, fontSize: 26, fontFamily: "serif", }}>
            Opinion
        </div>
      </div>
    </Link>
  }

  const getDesktopView = () => {
    return <nav>
      <div style={{ display: "flex", listStyle: "none", width: 900 }}>
        <div style={{ width: 200, paddingLeft: 10 }}>
          {wrapHead(imgurl, '/login', 'Opinion')}
        </div>
        <div style={{ flexGrow: 1, border: "1px solid #fff", display: "flex", flexDirection: "column" }}>
        </div>
        <div style={{ width: 50 }}>
          {wrapNav('/add', '', <div style={{ paddingTop: 2, display: "flex" }}><AddIcon sx={{ fontSize: 32 }} /></div>)}
        </div>
        <div style={{ width: 50 }}>
          {wrapNav('/explore/feeds/content/1', '', <div style={{ paddingTop: 2, display: "flex" }}><ExploreIcon sx={{ fontSize: 32 }} /></div>)}
        </div>
        
        <div style={{ width: 40 }} >
          {wrapNav('/message/to', '', <div style={{ paddingTop: 4, display: "flex" }}><BsMessenger size={26} /></div>)}
        </div>
        <div style={{ width: 45 }} >
          {wrapNotifyNav('/notification', '', <div style={{ paddingTop: 0, display: "flex" }}><NotificationsIcon sx={{ fontSize: 34 }} /></div>)}
        </div>
        <div style={{ width: 50 }}>
          {wrapProfileNav('/profile/show/overview', '', <div style={{ paddingTop: 1 }}><AccountCircleIcon sx={{ fontSize: 33 }} /></div>)}
        </div>
        <div style={{ width: 30 }} >
          <div style={{ paddingTop: 1, padding: 5, color: "#AEAEAE", cursor: "pointer" }}><LogoutIcon
            onClick={() => {
              console.log("logout..")
              doLogout()
            }}
            sx={{ fontSize: 33 }} /></div>
        </div>
      </div>
    </nav>
  }

  const getMobileView = () => {
    return <Grid container style={{ display: "flex", listStyle: "none", }}>
            <Grid item xs={1} ></Grid>
            <Grid style={{ display: "flex", justifyContent: "start", paddingTop: 10, border:"1px solid #fff"  }} item xs={9}>
              <div style={{ paddingLeft: 0, paddingTop: 0, display:"flex" }}>
                <img src={imgurl} alt="t1" height="26" width="26" />
                <div style={{padding:5, paddingTop:0, paddingLeft:10 ,fontSize:22}}>
                  Opinion
                </div>
              </div>
            </Grid>
            
            <Grid style={{ display: "flex", justifyContent: "start", alignItems: "center", }} item xs={2} >
              {wrapNav('/message/to', '', <div style={{ paddingTop: 0, display: "flex" }}><BsMessenger size={22} /></div>)}
            </Grid>
          </Grid>
  }

  return (
    <div>
      {(width > 800) ? getDesktopView() : <></>}
      {(width < 800) ? getMobileView() : <></>}
    </div>
  )
}

export default NavbarAuth