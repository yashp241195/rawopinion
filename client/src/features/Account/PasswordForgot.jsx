import React,{useState, useEffect} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {TextField, Button, } from '@mui/material' 
import { useLazyQuery } from '@apollo/client';
import { gql, } from '@apollo/client';
import validationRules from '../../config/isValid';
import Joi from 'joi';
import {CircularProgress } from '@mui/material'

const PasswordForgot = () => {

  const [width,] = useWindowSize()

  const [ email, setEmail ] = useState('')
  const [ passwordForgotError, setPasswordForgotError ] = useState(null)

  const PASSWORD_FORGET_QUERY = gql`
    query ForgotPasswordQuery($email:String){
        forgotPassword(email:$email)
    }
  `

  const [ doForgotPassword, { loading, error, data }] = useLazyQuery(PASSWORD_FORGET_QUERY);

  const isValidEmailSchema = Joi.object({
    email: validationRules.email,
  })

  useEffect(()=>{
    
    const checkErrors = () => {
      if(email == ""){ setPasswordForgotError(null) }
      else{
        const errorValid = isValidEmailSchema.validate({ email }).error
        if(errorValid){ setPasswordForgotError({message:errorValid.message}) }
        else{
          setPasswordForgotError(null)
        }
      }
    }
    checkErrors()
  },[ email ])
  

  const onForgotPasswordClick = () => {
    
    const errorValid = isValidEmailSchema.validate({email}).error
    if(!errorValid){
      doForgotPassword({
        variables:{
          email
        },
        fetchPolicy: 'network-only',
      })
    }
  }

  const wrapTextView = ({text,type}) =>{
    return <div style={{padding:5}}>
              <TextField type={type} size="small" 
                variant="outlined" label={text} value={email} 
                onChange={(e)=>{ setEmail(e.target.value) }} />
            </div>
  }

  const wrapButtonView = ({text, size}) =>{
    return <div style={{padding:5}}>
              <Button onClick={()=>{ onForgotPasswordClick() }}
              color="primary" style={{ textTransform:'none', fontSize:14 }} 
              size={size} variant="contained">
                {text}
              </Button>
            </div>
  }

  const getDesktopView = () =>{
    return <div style={{display:"flex",justifyContent:"center",}}>
      <div>
        <div style={{fontSize:24, paddingTop:70, padding:5}}>Forgot Password</div>
        <div style={{width:250}}>
          {wrapTextView({ text:'Email', type:"email"  })}
        </div>
        <div style={{padding:5, color:"red"}}>
          {passwordForgotError && "Error : "+passwordForgotError.message || error && "Error : "+error.message}
        </div>
        <div>
         {wrapButtonView({text:'Email Login Link', size:"medium"})}
        </div>
      </div>
    </div>
  }

  const getMobileView = () =>{
    return <div style={{display:"flex",height:"65vh", paddingLeft:10}}>
    <div style={{paddingTop:40}}>
      <div style={{fontSize:24, padding:5}}>Forgot Password</div>
      <div style={{width:250}}>
        {wrapTextView({ text:'Email', type:"email"  })}
      </div>
      <div style={{ padding:5, color:"red"}}>
        {passwordForgotError && "Error : "+passwordForgotError.message || error && "Error : "+error.message}
      </div>
      <div>
        {wrapButtonView({text:'Email Login Link', size:"medium"})}
      </div>
    </div>
  </div>
  }

  return (
    <div>
      {!loading?
          <div>
              {
                !data?
                  <div>
                    {(width>800)?getDesktopView():<></>}
                    {(width<800)?getMobileView():<></>}
                  </div>
                  :
                  <div style={{ display:"flex", justifyContent:"center", paddingTop:15 }}>
                    {data.forgotPassword}
                  </div>
              }
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

export default PasswordForgot