import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { useGoogleLogin } from '@react-oauth/google';
import { TextField, Button, IconButton, LinearProgress } from '@mui/material' 
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonAddAltIcon1 from '@mui/icons-material/PersonAddAlt1';
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { useMutation } from '@apollo/client';
import Joi from 'joi';
import validationRules from '../../config/isValid'
import { gql, } from '@apollo/client';
import authVar from '../../vars/authVar';

const Signup = () => {
  
  const [width,] = useWindowSize()
  const navigate = useNavigate()

  const SIGNUP_QUERY = gql`
    mutation Signup($inputSignUp: SignUpInput) {
      signup(inputSignUp:$inputSignUp)
    }
  `;

  const SIGNUP_GOOGLE_QUERY = gql`
    mutation SignupWithGoogle($email:String, $sub:String){
      signupWithGoogle(email:$email, sub:$sub)
    }
  `;

  const saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))

  const [doGoogleSignup, { loading: loading1, error: errorGoogleSignup, data: dataGoogleSignup }] = useMutation(SIGNUP_GOOGLE_QUERY);
  const [doSignup, { loading: loading2, error: errorSignup, data: dataSignup }] = useMutation(SIGNUP_QUERY);

  const [signupInfo, setSignUpInfo] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const [signUpErrorValid, setSignUpErrorValid] = useState(null)

  const calculateAge = (dateString) => Math.floor((Date.now() - new Date(dateString)) / (365.25 * 24 * 60 * 60 * 1000));

  const signupSchema = Joi.object({
    email: validationRules.email,
    password: validationRules.password,
    age:validationRules.validAge,
    dateofbirth:Joi.string()
  })

  useEffect(()=>{
    
    const checkErrors = () => {
      if(signupInfo == null){ setSignUpErrorValid(null) }
      else{
        const errorValid = signupSchema.validate(signupInfo).error
        if(errorValid){ setSignUpErrorValid({message:errorValid.message}) }
        else{
           setSignUpErrorValid(null) 
        }
      }
    }

    checkErrors()

  },[ signupInfo ])


  if (dataGoogleSignup) { 
    const newState = {
      token:dataGoogleSignup.signupWithGoogle,
      hasEssential:true,
      isDeactivated:false,
      isBanned:false,
    }
    saveToLocal("auth",newState)
    authVar(newState)
    navigate("/explore")
  }


  const onGoogleSignUp = useGoogleLogin({
    onSuccess: async codeResponse => {
      const accessToken = codeResponse.access_token
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          },
        });
        const user = await response.json();
        const { sub, email } = user

        doGoogleSignup({
          variables:{
            email: email,
            sub: sub
          },
          fetchPolicy: 'network-only',
        })
      } catch (error) {
        console.error('User profile request failed:', error);
      }
    },
    flow: 'implicit',
  });

  const onSignUp = () => {
    const error = signupSchema.validate(signupInfo).error
    if (!error) {
      doSignup({
        variables: {
          inputSignUp:{
            email: signupInfo.email,
            password: signupInfo.password,
            dateofbirth: signupInfo.dateofbirth,
          }
        },
        fetchPolicy: 'network-only',
      })
    }
  }

  const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer  components={['DatePicker']}>
          <DatePicker 
            render
            onChange={(e)=>{
              setSignUpInfo({
                ...signupInfo, 
                "dateofbirth":JSON.stringify(e),
                "age":calculateAge(e)
              })
            }}
            slotProps={{ textField: { size: 'small' }, 
            popper:{
              placement:"top-start",
              style:{ maxHeight:243 }
            } }}
            format="DD-MM-YYYY"
            label="Date of Birth" />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  const wrapTextView = ({label, value}) =>{
    return <div style={{padding:5}}>
              <TextField 
                type={"text"} variant="outlined" size="small" label={label}
                onChange={(e)=>setSignUpInfo({...signupInfo, [value]:e.target.value})} 
              />
            </div>
  }

  const wrapTextPasswordView = ({label, value}) =>{
    return <div style={{padding:5}}>
              <TextField 
                type={!showPassword?"password":"text"} 
                size="small" label={label} variant="outlined"
                onChange={(e)=>setSignUpInfo({...signupInfo, [value]:e.target.value})}
                InputProps={{
                  endAdornment:
                    <IconButton aria-label="toggle password visibility"
                      edge="end" onClick={()=>setShowPassword(!showPassword)}
                    > 
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
               />
            </div>
  }

  const wrapSignUpButtonView = ({text, size}) =>{
    return <div style={{padding:5}}>
              <Button startIcon={<PersonAddAltIcon1 />} 
              onClick={() => { onSignUp() }}
              color="primary" style={{ textTransform:'none', fontSize:14 }} 
              size={size} variant="contained">
                {text}
              </Button>
            </div>
  }

  const wrapGoogleButtonView = ({text, size}) =>{
    return <div style={{padding:5,}}>
              <Button 
                startIcon={<GoogleIcon />} 
                onClick={() => {onGoogleSignUp()}}
                size={size} variant="outlined"
                style={{ 
                  color:"#595959", textTransform:'none', 
                  fontSize:14, border:"1px solid #D3D3D3"
                }} 
              >
                {text}
              </Button>
            </div>
  }

  const getMobileView = () => {
    return <div style={{paddingLeft:20, height:"65vh"}}>
      <div style={{ fontSize:24, padding:5, paddingTop:20 }}>
        Signup
      </div>
      <div style={{ fontSize:14, padding:5, color:"#595959"}} >
        Already have an account? 
        <Link style={{textDecoration:"none", color:"#1976d2"}} to="/login"> Login</Link>
      </div>
      <div style={{width:200, padding:5, }}>
        {wrapGoogleButtonView({text:'Signup with Google', size:"medium"})}
      </div>
      <div style={{ paddingLeft: 5, color: "red", fontSize: 14 }}>
        {errorGoogleSignup && "Error : " + errorGoogleSignup.message}
      </div>
      <div style={{padding:5, width:220}}>
        {loading1?<LinearProgress />:<></>}
      </div>
      <div style={{ fontSize:16,paddingBottom:10, padding:5,}}>
        or
      </div>
      <div style={{width:250}}>
        {wrapTextView({ label:"Email" , value:"email", })}
      </div>
      <div style={{width:250}}>
        {wrapTextPasswordView({ label:"Password" , value:"password", })}
      </div>
      <div style={{width:240, marginTop:-5, paddingLeft:5, }}>
        {BasicDatePicker()}
      </div>
      <div style={{ padding: 5, width: 240, fontSize: 14, color: "red" }} >
        {signUpErrorValid && "Error : "+signUpErrorValid.message || errorSignup && "Error : "+errorSignup.message}
      </div>
      <div style={{padding:5, width:220}}>
        {loading2?<LinearProgress />:<></>}
      </div>
      <div>
        {wrapSignUpButtonView({text:'Signup', size:"medium"})}
      </div>
      <div style={{paddingTop:20}}></div>
    </div>

  }

  const getDesktopView = () => {
    return <div>
      <div style={{ fontSize:24, padding:5, paddingTop:20 }}>
        Signup
      </div>
      <div style={{ fontSize:16, padding:5, color:"#595959"}} >
        Already have an account? 
        <Link style={{textDecoration:"none", color:"#1976d2"}} to="/login"> Login</Link>
      </div>
      <div style={{width:200, padding:5, }}>
        {wrapGoogleButtonView({text:'Signup with Google', size:"medium"})}
      </div>
      <div style={{ paddingLeft: 5, color: "red", fontSize: 14 }}>
        {errorGoogleSignup && "Error : " + errorGoogleSignup.message}
      </div>
      <div style={{padding:5, width:220}}>
        {loading1?<LinearProgress />:<></>}
      </div>
      <div style={{ fontSize:16,paddingBottom:10, padding:5,}}>
        or
      </div>
      <div style={{width:240}}>
        {wrapTextView({ label:"Email" , value:"email", })}
      </div>
      <div style={{width:240}}>
        {wrapTextPasswordView({ label:"Password" , value:"password", })}
      </div>
      <div style={{width:230, marginTop:-5, paddingLeft:5, }}>
        {BasicDatePicker()}
      </div>
      <div style={{ padding: 5, width: 240, fontSize: 14, color: "red" }} >
        {signUpErrorValid && "Error : "+signUpErrorValid.message || errorSignup && "Error : "+errorSignup.message}
      </div>
      <div style={{padding:5, width:220}}>
        {loading2?<LinearProgress />:<></>}
      </div>
      <div>
        {wrapSignUpButtonView({text:'Signup', size:"medium"})}
      </div>
      <div style={{paddingTop:20}}></div>
    </div>
  }

  return (
    <div>
      {
        !dataSignup?
          <div>
            {(width > 800?getDesktopView():<></> )}
            {(width < 800?getMobileView():<></> )}
          </div>:
          <div style={{ paddingTop:20 }}>
            {dataSignup.signup}
          </div>
      }
       
    </div>
  )
}

export default Signup