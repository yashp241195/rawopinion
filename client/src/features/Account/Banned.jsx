import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Link } from 'react-router-dom';
import { gql, } from '@apollo/client';
import { useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'
import {CircularProgress } from '@mui/material'

const Banned = () => {

  const [width,] = useWindowSize()
  const client = useApolloClient()
  const navigate = useNavigate()

  const DO_LOGOUT = gql`
    mutation Logout{
        logout
    }
  `;

  const [ doLogout ,{ loading, error, data }] = useMutation(DO_LOGOUT,{fetchPolicy:"network-only"});

  if (data){
      client.clearStore();
      localStorage.clear();
      window.location.reload(true);
  }

  const onLogout = () => {
    doLogout()
  }

  const getDesktopView = () =>{
    return <div style={{display:"flex",justifyContent:"center"}}>
            <div>
              <div style={{fontSize:24, paddingTop:70, padding:5}}>Banned</div>
              <div style={{display:"flex"}}>
                Click
                <div style={{paddingLeft:5, paddingRight:5}}>
                  <Link onClick={()=>{onLogout()}}>
                    here
                  </Link>   
                </div>  
                to logout  
              </div>
              <div style={{color:"red", paddingTop:20}} >
                {error && error.message}
              </div>
            </div>
          </div>
  }

  const getMobileView = () =>{
    return <div style={{display:"flex",justifyContent:"center"}}>
            <div>
              <div style={{fontSize:24, paddingTop:70, padding:5}}>Banned</div>
              <div style={{display:"flex"}}>
                Click
                <div style={{paddingLeft:5, paddingRight:5}}>
                  <Link onClick={()=>{onLogout()}}>
                    here
                  </Link>   
                </div>  
                to logout  
              </div>
              <div style={{color:"red", paddingTop:20}} >
                {error && error.message}
              </div>
            </div>
          </div>
  }

  return (
    <div>
      {!loading?
        <div>
          {(width>800)?getDesktopView():<></>}
          {(width<800)?getMobileView():<></>}
        </div>
        :
        <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100vh", }}>
          <div style={{ display:"flex", justifyContent:"center", flexDirection:"column",}} >
            <CircularProgress />
          </div>
        </div>
      }
    </div>
  )
}

export default Banned