import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Avatar, Grid } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { gql, useQuery, } from '@apollo/client';
import { useMutation, useApolloClient } from '@apollo/client';
import PeopleIcon from '@mui/icons-material/People';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useReactiveVar } from '@apollo/client';
import appmodeVar from '../../vars/appmodeVar';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';


const RecruitOptions = (props) => {

  const [width,] = useWindowSize()

  const appmode = useReactiveVar(appmodeVar)


  const location = useLocation()
  const navigate = useNavigate()

  const client = useApolloClient()

  const recruitoptions = [
    { name: "Saved People", url: "/recruit/saved/people", icon: <BookmarkBorder />, state: false },
    { name: "Jobs Posted", url: "/recruit/jobs/posted", icon: <WorkHistoryIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Company Joined", url: "/recruit/company/joined", icon: <BusinessIcon sx={{ fontSize: 28 }} />, state: false },  
  ]

  const recruitoptions2 = [
    { name: "Create a Job Post", url: "/recruit/create/job", icon: <AddCircleOutlineIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Create a Company Page", url: "/recruit/create/company", icon: <AddBusinessIcon sx={{ fontSize: 28 }} />, state: false },

  ]



  const GET_PROFILE_VIEW = gql`
    query GetProfileView{
      getProfileView{
        firstname
        lastname
        profileinfo{
          imageGallery{
            imgid url  icon_url
          }
          location{
            address
          }
        }
        age
      }
    }

  `


  const {data:data1, loading:loading1, error:error1} = useQuery(GET_PROFILE_VIEW,{fetchPolicy:"cache-and-network"})

  

 

  const getDesktopView = () => {
    return <Grid container>
      <Navigate to={"/profile/show"} />
    </Grid>
  }

  const getMobileView = () => {

    const profilepic = data1 && data1.getProfileView.profileinfo.imageGallery.filter(it=>it.imgid == 1)[0].icon_url
    
    return <div style={{ width: "100%", display: "flex", flexDirection: "column", height: "70vh", }}>
      {(appmode === "JOB_SEARCH")?<Navigate to={"/work/options"} />:<></>}

      <div style={{}}>
        <List dense={true}>
          {
            recruitoptions.map((item, i) => {
              
              const { name, url, icon, state } = item
              const color = (location.pathname === url) ? "#3B3B3B" : "#979797"

              return <div style={{ height: 50, }} key={i}>
                <Link style={{ textDecoration: "none", color: "#595959",  }} to={url}>
                  <ListItemButton>
                    <ListItem sx={{}}>
                      <ListItemIcon>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <div style={{ fontSize: 16, color: "#595959",fontFamily:"serif" }}>
                            {name}
                          </div>
                        }
                      />
                    </ListItem>
                  </ListItemButton>
                </Link>
              </div>
            })
          }
        </List>
      </div>
      <div style={{ display:"flex", justifyContent:"center", paddingTop:50, paddingBottom:20  }}>
        <div style={{width:"80%", fontSize:18, color:"#595959"}}>
        Create New
        </div>
      </div>
      <div style={{}}>
        <List dense={true}>
          {
            recruitoptions2.map((item, i) => {
              
              const { name, url, icon, state } = item
              const color = (location.pathname === url) ? "#3B3B3B" : "#979797"

              return <div style={{ height: 50, }} key={i}>
                <Link style={{ textDecoration: "none", color: "#595959",  }} to={url}>
                  <ListItemButton>
                    <ListItem sx={{}}>
                      <ListItemIcon>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <div style={{ fontSize: 16, color: "#595959",fontFamily:"serif" }}>
                            {name}
                          </div>
                        }
                      />
                    </ListItem>
                  </ListItemButton>
                </Link>
              </div>
            })
          }
        </List>
      </div>
      <div style={{ flexGrow: 1 }}>
      </div>
    </div>
  }

  return (
    <div style={{ display: "flex", }}>
      {(width > 800) ? getDesktopView() : <></>}
      {(width < 800) ? getMobileView() : <></>}
    </div>
  )
}

export default RecruitOptions