import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Navigate, useNavigate } from 'react-router-dom'
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import authVar from '../../vars/authVar'
import { Link } from 'react-router-dom';
import {CircularProgress } from '@mui/material'

const Deactivated = () => {

  const [width,] = useWindowSize()
  const isAuth = useReactiveVar(authVar)
  const navigate = useNavigate()

  const REACTIVATE_QUERY = gql`
    mutation Reactivate{
      reactivate
    }
  `

  const [doReactivate,{data:data, error:error, loading:loading}] = useMutation(REACTIVATE_QUERY,{fetchPolicy:"network-only"})

  const saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))


  if(data){
    const auth = getFromLocal("auth")
    const newState = {
      ...auth,
      isDeactivated:false,
    }

    saveToLocal("auth",newState)
    authVar(newState)
    navigate("/explore")

  }

  

  const getDesktopView = () =>{
    return <div style={{display:"flex", justifyContent:"center"}}>
            <div>
              <div style={{fontSize:24, paddingTop:70, padding:5}}>Deactivated</div>
              <div>
                {isAuth && isAuth.errorMessage}
              </div>
              <div style={{display:"flex"}}>
                Click
                <div onClick={()=>{ doReactivate();}} style={{paddingLeft:5, paddingRight:5}}>
                  <Link >
                    here
                  </Link>   
                </div>  
                to reactivate
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
              <div style={{fontSize:24, paddingTop:70, padding:5}}>Deactivated</div>
              <div style={{display:"flex"}}>
                Click
                <div style={{paddingLeft:5, paddingRight:5}}>
                  <Link onClick={()=>{doReactivate()}}>
                    here
                  </Link>   
                </div>  
                to reactivate
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

export default Deactivated