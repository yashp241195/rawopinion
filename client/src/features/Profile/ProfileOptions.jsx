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
import ArticleIcon from '@mui/icons-material/Article';
import HistoryIcon from '@mui/icons-material/History';

const ProfileOptions = (props) => {

  const [width,] = useWindowSize()

  const location = useLocation()
  const navigate = useNavigate()

  const client = useApolloClient()

  const profileoptions = [
    { name: "Connections", url: "/profile/connections/following/1", icon: <PeopleIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Edit Profile", url: "/profile/user/edit/profile", icon: <ManageAccountsIcon sx={{ fontSize: 28 }} />, state: false },
    { name: "Settings", url: "/profile/settings", icon: <SettingsIcon sx={{ fontSize: 28 }} />, state: false },
  ]


  const DO_LOGOUT = gql`
    mutation Logout{
        logout
    }
  `;

  const GET_PROFILE_VIEW = gql`
    query GetProfileView($username:String,$view:String){
      getProfileView(username:$username,view:$view){
        firstname lastname username
        profilePic{
          imgid url icon_url 
          identifiedAs filter 
          isProfileSafe isSafe
          neutral porn drawing sexy hentai
        }
      }
    }

  `

  const [doLogout, { loading, error, data }] = useMutation(DO_LOGOUT, { fetchPolicy: "network-only" });

  const {data:data1, loading:loading1, error:error1} = useQuery(GET_PROFILE_VIEW,
    {
      variables:{
        username:null,
        view:"main"
      },
      fetchPolicy:"network-only"
    }
  )

  if(data1){
    console.log("data1",data1)
  }
  
  if(error1){
    console.log("error1",error1)
  }

  if (data) {
    client.clearStore();
    localStorage.clear();
    navigate("/")
  }


  const getDesktopView = () => {
    return <Grid container>
      <Navigate to={"/profile/show"} />
    </Grid>
  }

  const getMobileView = () => {
    

    return <div style={{ width: "100%", display: "flex", flexDirection: "column", height: "70vh", }}>
      <div style={{flexGrow: 1 }}></div>
      <div style={{ }}>
        <List dense={true}>
        <Link style={{ textDecoration: "none", color: "#595959", fontFamily:"serif" }} to={"/profile/show/overview"}>
          <ListItemButton>
            <ListItem sx={{}}>
              <ListItemIcon >
                <Avatar
                  src={
                    data1 && data1.getProfileView.profilePic && 
                    data1.getProfileView.profilePic.icon_url
                  }
                  sx={{ height: 60, width: 60 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div style={{   paddingLeft:10 }}>
                    <div style={{ fontSize: 24, color:"#000", fontFamily:"serif",  paddingLeft:5,   }}>
                      {data1 && data1.getProfileView.firstname} 
                    </div>
                    <div style={{  paddingLeft:5, fontFamily:"sans-serif", fontWeight:"bold", color:"#0047AB"}}>
                      {data1 && data1.getProfileView.publicusername}
                    </div>
                  </div>
                }
                secondary={
                  <div style={{   paddingLeft:10, paddingTop:2 }}>
                    <div style={{ paddingLeft:5, fontSize: 12, color:"#1976d2", fontFamily:"sans-serif" }}>
                      View full profile -&gt;
                    </div>
                  </div>
                }
              />
            </ListItem>
          </ListItemButton>
          </Link>
        </List>

      </div>
      <div style={{}}>
        <List dense={true}>

          {
            profileoptions.map((item, i) => {
              const { name, url, icon, state } = item
              const color = (location.pathname === url) ? "#3B3B3B" : "#979797"
              return <div style={{ height: 50, }} key={i}>
                <Link style={{ textDecoration: "none", color: "#595959",  }} to={url}>
                  <ListItemButton>
                    <ListItem sx={{}}>
                      <ListItemIcon >
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
          <ListItemButton
            onClick={() => {
              doLogout()
            }}
            style={{ textDecoration: "none", }} >
            <ListItem sx={{}}>
              <ListItemIcon>
                <LogoutIcon
                  sx={{ fontSize: 24 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div style={{ fontSize: 16, color: "#595959", fontFamily:"serif" }}>
                    {"Logout"}
                  </div>

                }
              />
            </ListItem>
          </ListItemButton>
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

export default ProfileOptions