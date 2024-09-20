import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import { gql, } from '@apollo/client';
import {CircularProgress } from '@mui/material'

const EmailVerify = () => {

  const [width,] = useWindowSize()
  const { token } = useParams()

  const EMAIL_VERIFY_QUERY = gql`
    query EmailVerifyQuery($token:String){
        verifyEmail(token:$token)
    }
  `

  const { loading, error, data } = useQuery(
    EMAIL_VERIFY_QUERY, 
    { 
      variables:{ token },
      fetchPolicy:"network-only" 
    }
  );

  if(loading){ console.log("loading",loading) }


  const getDesktopView = () =>{
    return <div style={{display:"flex",justifyContent:"center"}}>
      <div>
        <div style={{fontSize:24, paddingTop:70, padding:5}}>Email Verification</div>
        <div style={{padding:5}}>
          {error?"Email Verification failed":""}
          {data?"Email Verification successful":""}
        </div>
      </div>
    </div>
  }

  const getMobileView = () =>{
    return <div style={{display:"flex",justifyContent:"center"}}>
            <div>
              <div style={{fontSize:24, paddingTop:40, padding:5}}>Email Verification</div>
              <div style={{padding:5}}>
                {error?"Email Verification failed":""}
                {data?"Email Verification successful":""}
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

export default EmailVerify