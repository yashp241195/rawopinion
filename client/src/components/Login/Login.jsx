import React, { useState, useEffect } from 'react'
import { TextField, Button, IconButton, LinearProgress } from '@mui/material'
import useWindowSize from '../../hooks/useWindowSize'
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AndroidIcon from '@mui/icons-material/Android';
import { Link, useNavigate } from 'react-router-dom'
import Joi from 'joi';
import { decodeToken } from "react-jwt";
import { useLazyQuery } from '@apollo/client';
import validationRules from '../../config/isValid'
import { gql, } from '@apollo/client';
import authVar from '../../vars/authVar';
import appmodeVar from '../../vars/appmodeVar';



const Login = () => {

  const [width,] = useWindowSize()
  const navigate = useNavigate()


  const [showPassword, setShowPassword] = useState(false)

  const [loginInfo, setloginInfo] = useState(null)
  const [loginErrorValid, setloginErrorValid] = useState(null)


  const LOGIN_QUERY = gql`
    query LoginQuery($email: String, $password: String) {
      login(email: $email, password: $password)
    }
  `;

  const LOGIN_GOOGLE_QUERY = gql`
    query SignInWithGoogle($email:String, $sub:String){
      signInWithGoogle(email:$email, sub:$sub)
    }
  `;

  const [doLogin, { loading: loading, error: error, data: data }] = useLazyQuery(LOGIN_QUERY);
  const [doGoogleLogin, { loading: loadingG, error: errorG, data: dataG }] = useLazyQuery(LOGIN_GOOGLE_QUERY);

  const saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))


  if(error){
    console.log("error",error)
  }

  if (data) {
    const newState = {
      token:data.login, 
      hasEssential:true,
      isDeactivated:false,
      isBanned:false,
    }
    saveToLocal("auth",newState)
    authVar(newState)
    navigate("/explore")
  }

  if (dataG) {
    const newState = {
      token:dataG.signInWithGoogle,
      hasEssential:true,
      isDeactivated:false,
      isBanned:false,
    }
    saveToLocal("auth",newState)
    authVar(newState)
    navigate("/explore")
  }

  const loginSchema = Joi.object({
    email: validationRules.email,
    password: validationRules.password,
  })

  useEffect(()=>{
    
    const checkErrors = () => {
      if(loginInfo == null){ setloginErrorValid(null) }
      else{
        const errorValid = loginSchema.validate(loginInfo).error
        if(errorValid){ setloginErrorValid({message:errorValid.message}) }
        else{ setloginErrorValid(null) }
      }
    }

    checkErrors()

  },[ loginInfo ])


  const onLogin = () => {

    const errorValid = loginSchema.validate(loginInfo).error
    if (!errorValid) {
      doLogin({
        variables: {
          email: loginInfo.email,
          password: loginInfo.password
        },
        fetchPolicy: 'network-only',
      })
    }
    
  }

  const onGoogleLogin = (credentialResponse) => {
    const decodedToken = decodeToken(credentialResponse.credential);
    doGoogleLogin({
      variables: {
        email: decodedToken.email,
        sub: decodedToken.sub
      },
      fetchPolicy: 'network-only',
    })

  }

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const decodedToken = decodeToken(credentialResponse.credential);
      doGoogleLogin({
        variables: {
          email: decodedToken.email,
          sub: decodedToken.sub
        },
        fetchPolicy: 'network-only',
      })
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const wrapTextView = ({ label, value }) => {
    return <div style={{ padding: 5 }}>
              <TextField  size="small" label={label} 
                type={"text"} variant="outlined"
                onChange={(e) => 
                  setloginInfo({ 
                    ...loginInfo, 
                    [value]: e.target.value 
                  })
                }
              />
            </div>
  }

  const wrapTextPasswordView = ({ label, value }) => {
    return <div style={{ padding: 5 }}>
              <TextField 
                type={!showPassword ? "password" : "text"}
                size="small" label={label} variant="outlined"
                onChange={
                  (e) => {
                      setloginInfo({ 
                        ...loginInfo, 
                        [value]: e.target.value 
                      })
                  }
                }
                InputProps={{
                  endAdornment:
                    <IconButton edge="end" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
              />
            </div>
  }

  const wrapLoginButtonView = ({ text, size }) => {
    return <div style={{ padding: 5 }}>
              <Button size={size} 
                color="primary" variant="contained" 
                sx={{ textTransform: "none" }} 
                startIcon={<LoginIcon />} 
                onClick={() => { 
                  onLogin() 
                }}
                >
                  {text}
              </Button>
            </div>
  }

  const wrapGooglePlayButtonView = ({ text, size }) => {
    return <div style={{ padding: 5 }}>
      <Button disabled 
        startIcon={<AndroidIcon />} 
        size={size} 
        variant="outlined" style={{ 
          textTransform: 'none', 
          border: "1px solid #efefef" 
        }}
      >{text}</Button>
    </div>
  }

  
  const getMobileView = () => {
    return <div style={{ height: "65vh" }}>
      <div style={{ fontSize: 24, paddingBottom: 10, padding: 5 }}>
        Login 
      </div>
      <div style={{ fontSize: 14, padding: 5, color: "#595959" }} >
        Don't have an account?
        <Link color='secondary' style={{ textDecoration: "none", }} to="/signup"> Signup</Link>
      </div>
      <div style={{ width: 200, padding: 5 }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            doGoogleLogin(credentialResponse)
          }}
          onError={() => { console.log('Login Failed'); }}
        />
      </div>
      <div style={{padding:5, width:220}}>
        {loadingG?<LinearProgress />:<></>}
      </div>
      <div style={{ paddingLeft: 5, color: "red", fontSize: 14 }}>
        {errorG && "Error : "+errorG.message}
      </div>
      <div style={{ fontSize: 16, paddingBottom: 10, padding: 5, }}>
        or
      </div>
      <div style={{ width: 240 }}>
        {wrapTextView({ label: "Email", value: "email", })}
      </div>
      <div style={{ width: 240 }}>
        {wrapTextPasswordView({ label: "Password", value: "password", })}
      </div>
      <div style={{ padding: 5, width: 240, color:"red" }} >
       {loginErrorValid && "Error : "+loginErrorValid.message || error && "Error : "+error.message}
      </div>
      <div style={{padding:5, width:220}}>
        {loading?<LinearProgress />:<></>}
      </div>
      <div>
        {wrapLoginButtonView({ text: 'Login', size: "medium", })}
      </div>
      <div style={{ padding: 5 }} >
        <Link 
          style={{ textDecoration: "none", color: "#1976d2" }} 
          to="/account/password/forgot">
          Forgotten password? 
        </Link>
      </div>
      <div style={{ paddingTop: 10 }}>
      </div>
      <div style={{ display: "flex", }}>
        <div>
          {wrapGooglePlayButtonView({ text: 'Google Playstore', size: "small" })}
        </div>
      </div>
    </div>

  }

  const getDesktopView = () => {
    return <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ fontSize: 24, paddingBottom: 10, padding: 5 }}>
          Login 
        </div>
        <div style={{ fontSize: 16, padding: 5, color: "#595959" }} >
          Don't have an account?
          <Link style={{ textDecoration: "none", color: "#1976d2" }} to="/signup"> Signup</Link>
        </div>
        <div style={{ width: 200, padding: 5 }}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              onGoogleLogin(credentialResponse)
            }}
          />
        </div>
        <div style={{padding:5, width:220}}>
          {loadingG?<LinearProgress />:<></>}
        </div>
        <div style={{ paddingLeft: 5, color: "red", fontSize: 14 }}>
          {errorG && "Error : "+errorG.message}
        </div>
        <div style={{ fontSize: 16, paddingBottom: 10, padding: 5, }}>
          or
        </div>
        <div style={{ width: 240 }}>
          {wrapTextView({ label: "Email", value: "email", })}
        </div>
        <div style={{ width: 240 }}>
          {wrapTextPasswordView({ label: "Password", value: "password", })}
        </div>
        <div style={{ padding: 5, width: 240, fontSize: 14, color: "red" }} >
          {loginErrorValid && "Error : "+loginErrorValid.message || error && "Error : "+error.message}
        </div>
        <div style={{padding:5, width:220}}>
          {loading?<LinearProgress />:<></>}
        </div>
        <div>
          {wrapLoginButtonView({ text: 'Login', size: "medium" })}
        </div>
        <div style={{ padding: 5 }} >
          <Link 
            style={{ textDecoration: "none", color: "#1976d2" }} 
            to="/account/password/forgot">
              Forgotten password? 
          </Link>
        </div>
        <div style={{ paddingTop: 10 }}></div>
        <div style={{ display: "flex", }}>
          <div>
            {wrapGooglePlayButtonView({ text: 'Google Playstore', size: "small" })}
          </div>
        </div>
      </div>
    </div>
  }

  const saveToLocalDirect = (key, value) => localStorage.setItem(key, value)
  saveToLocalDirect("hasInternet",true)
  appmodeVar("JOB_SEARCH")
  saveToLocalDirect("appmode","JOB_SEARCH")

  return (
    <div>
      {(width > 800 ? getDesktopView() : <></>)}
      {(width < 800 ? getMobileView() : <></>)}
    </div>
  )
}

export default Login