import React, {useEffect, useState} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {TextField, Button, IconButton, } from '@mui/material' 
import {Visibility, VisibilityOff } from '@mui/icons-material';
import { useLazyQuery, gql  } from '@apollo/client';
import { useParams, Link } from 'react-router-dom'
import validationRules from '../../config/isValid';
import Joi from 'joi';
import {CircularProgress } from '@mui/material'

const PasswordReset = () => {

  const [ width, ] = useWindowSize()

  const { token } = useParams()

  const [ password, setPassword ] = useState(null)
  const [ passwordConfirm, setPasswordConfirm ] = useState(null)

  const [ showPassword, setShowPassword ] = useState(false)
  const [ showPasswordConfirm, setShowPasswordConfirm ] = useState(false)

  const [ passwordResetError, setResetPasswordError ] = useState(null)

  const PASSWORD_RESET_QUERY = gql`
    query ResetPasswordQuery($token:String, $password:String){
        resetPassword(token:$token, password:$password)
    }
  `

  const [doPasswordReset, { loading, error, data }] = useLazyQuery(
    PASSWORD_RESET_QUERY, { fetchPolicy:"network-only" }
  )

  const passwordResetSchema = Joi.object({
    password: validationRules.password,
    passwordConfirm: validationRules.password,
  })

  useEffect(()=>{
    
    const checkErrors = () => {
      if(password == null && passwordConfirm == null ){
        setResetPasswordError(null)
        return
      }

      if(password == passwordConfirm){ 
        const errorValid = passwordResetSchema.validate({
          password, passwordConfirm }).error
          if(errorValid){
            setResetPasswordError({message:errorValid.message})
          }else{
            setResetPasswordError(null)
          }
      }else{
        setResetPasswordError({message:"password and confirm password doesn't match"})
      }
    }

    checkErrors()

  },[ password, passwordConfirm ])



  const onPasswordReset = () => {
    const errorValid = passwordResetSchema.validate({
      password, passwordConfirm }).error

      if(password === passwordConfirm){
        if(!errorValid){
          doPasswordReset({
            variables:{ token, password },
            fetchPolicy:"network-only"
          })
        }
      }
      else{
        setResetPasswordError({message:"password and confirm password doesn't match"})
      }
    
  }
  console.log(password,passwordConfirm)
  console.log("passwordResetError",passwordResetError)

  const wrapTextView = ({text, type, value, setValue, show, setShow}) =>{
    return <div style={{padding:5}}>
              <TextField 
                size="small" label={text} value={value}
                type={show?"text":"password"} 
                onChange={(e)=>{ setValue(e.target.value) }}
                InputProps={{
                  endAdornment:
                    (type === "password")?
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShow(!show)}
                      > 
                        {!show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>:<></>
                }}
                variant="outlined" 
              />
            </div>
  }
 
  const wrapButtonView = ({text,size}) =>{
    return <div style={{padding:5}}>
              <Button color="primary" 
                onClick={()=>{onPasswordReset() }}
                style={{ textTransform:'none', fontSize:14 }} 
                size={size} variant="contained"> 
                  {text} 
              </Button>
            </div>
  }
  
  const getDesktopView = () =>{
    return <div style={{display:"flex",justifyContent:"center"}}>
            <div>
              <div style={{fontSize:24, paddingTop:70, padding:5}}>Reset Password</div>
              <div style={{width:250}}>
                {
                  wrapTextView({ 
                    text:'New Password', type:"password", 
                    value:password , setValue:setPassword,
                    show:showPassword, setShow:setShowPassword 
                  })
                }
              </div>
              <div style={{width:250}}>
                {
                  wrapTextView({ 
                    text:'Confirm New Password', type:"password", 
                    value:passwordConfirm, setValue:setPasswordConfirm,
                    show:showPasswordConfirm, setShow:setShowPasswordConfirm 
                  })
                }
              </div>
              <div style={{padding:5, color:"red", width:300}}>
                {passwordResetError && "Error : " +passwordResetError.message || error && "Error : "+error.message}
              </div>
              <div>
              {wrapButtonView({text:'Change Password', size:"medium"})}
              </div>
            </div>
          </div>
  }

  const getMobileView = () =>{
    return <div style={{display:"flex",height:"65vh", paddingLeft:15}}>
            <div style={{paddingTop:40}}>
              <div style={{fontSize:24, padding:5}}>Reset Password</div>
              <div style={{width:250}}>
                  {
                    wrapTextView({ 
                      text:'New Password', type:"password", 
                      value:password , setValue:setPassword,
                      show:showPassword, setShow:setShowPassword 
                    })
                  }
                </div>
                <div style={{width:250}}>
                  {
                    wrapTextView({ 
                      text:'Confirm New Password', type:"password", 
                      value:passwordConfirm, setValue:setPasswordConfirm,
                      show:showPasswordConfirm, setShow:setShowPasswordConfirm 
                    })
                  }
                </div>
                <div style={{padding:5, color:"red", width:250}}>
                  {passwordResetError && "Error : " +passwordResetError.message || error && "Error : "+error.message}
                </div>
              <div>
              {wrapButtonView({text:'Change Password', size:"medium"})}
              </div>
            </div>
          </div>
  }

  return (
    <div>
      
      
      {loading?
      <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100vh", }}>
        <div style={{ display:"flex", justifyContent:"center", flexDirection:"column",}} >
          <CircularProgress />
        </div>
      </div>
      :
      <div>
      {
        data?
          <div style={{ display:"flex", justifyContent:"center", paddingTop:20 }}>
            <div>
              <br/>
              <div style={{fontSize:20}}>
                Password reset successful
              </div>
              Please Click <Link to="/"> here</Link> to return
            </div>
          </div>
        :
          <div>
            {(width>800)?getDesktopView():<></>}
            {(width<800)?getMobileView():<></>}
          </div>
      }


      </div>
      }

    </div>
  )
}

export default PasswordReset