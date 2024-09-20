import React, {useState, useEffect} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Modal } from '@mui/material'
import {Visibility, VisibilityOff } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Joi from 'joi';
import { useMutation, useApolloClient } from '@apollo/client';
import validationRules from '../../config/isValid';
import {Link, useNavigate} from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { gql, } from '@apollo/client';

const Settings = () => {

  const [width, ] = useWindowSize()
  const client = useApolloClient()

  const navigate = useNavigate()

  const [username, setUsername] = useState(null)

  const [password, setPassword] = useState(null)
  const [newpassword, setNewPassword] = useState(null)
  const [passwordDeactivate, setPasswordDeactivate] = useState(null)

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  
  const [deleteAccount, setDeleteAccount] = useState(false)

  const [changePasswordError, setChangePasswordError ] = useState(null)
  const [deactivateError, setDeactivateError ] = useState(null)

  const [openDeactivateModal, setOpenDeactivateModal] = React.useState(false);

  const CHANGE_PASSWORD_QUERY = gql`
    mutation ChangePasswordQuery($password:String, $newPassword:String) {
      changePassword(password:$password, newPassword:$newPassword)
    }
  `;

  const DEACTIVATE_QUERY = gql`
    mutation DeactivateQuery($password:String, $deleteAccount:Boolean){
      deactivate(password:$password, deleteAccount:$deleteAccount)
    }
  `;

  const [doChangePassword, {data:data1, loading:loading1, error:error1}] = useMutation(CHANGE_PASSWORD_QUERY,{fetchPolicy:"network-only"})
  const [doDeactivate,{data:data2, loading:loading2, error:error2}] = useMutation(DEACTIVATE_QUERY,{fetchPolicy:"network-only"})
  
  if(data2){
    client.clearStore();
    localStorage.clear();
    navigate("/")
  }


  const deactivateSchema = Joi.object({
    password: validationRules.password,
  })

  const changePasswordSchema = Joi.object({
    password: validationRules.password,
    newpassword: validationRules.password,
  })


  useEffect(()=>{

    const checkErrorsDeactivate = () => {
      if(passwordDeactivate ==null){
        setDeactivateError(null)
        return
      }
      
      const errorValid = deactivateSchema.validate({password:passwordDeactivate}).error
      if(errorValid){
        setDeactivateError({message:errorValid.message})
      }else{
        setDeactivateError(null)
      }

    }

    const checkErrorsChangePassword = () => {
      if(password == null && newpassword == null ){
        setChangePasswordError(null)
        return
      }
      if(password == newpassword){
        console.log("passwordmatch")
        setChangePasswordError({ message:"New password must be different than old"})
        return
      }
      const errorValid = changePasswordSchema.validate({password, newpassword}).error
      if(errorValid){
        setChangePasswordError({message:errorValid.message})
      }
      else{
         setChangePasswordError(null)
      }
    }

    checkErrorsDeactivate()
    checkErrorsChangePassword()

  },[password, newpassword, passwordDeactivate, ])


  const onDeactivate = () => {
    const errorValid = deactivateSchema.validate({password:passwordDeactivate}).error
    if(!errorValid){
      doDeactivate({
        variables:{ password:passwordDeactivate, deleteAccount },
        fetchPolicy:"network-only"
      })
    }
  }

  const onChangePassword = () => {
    const errorValid = changePasswordSchema.validate({password, newpassword}).error
    if(!errorValid){
      doChangePassword({
        variables:{ 
          password:password, 
          newPassword:newpassword 
        },
        fetchPolicy:"network-only"
      })
    }
  }

  const onChangeUsername = () => {

  }

  const wrapTextView = ({text, type, value, setValue, show, setShow}) =>{
    return <div style={{padding:5}}>
              <TextField 
                name="pwd"
                autoComplete={"off"}
                size="small" label={text} 
                value={value}
                type={show?"text":"password"} 
                onChange={(e)=>{ 
                  const val = e.target.value
                  setValue(val) 
                }}
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

  const wrapButtonView = ({text, size, onClickfn}) =>{
    return <div style={{padding:5}}>
              <Button color="primary" 
                onClick={()=>{ onClickfn() }}
                style={{ textTransform:'none', fontSize:14 }} 
                size={size} variant="contained"> 
                  {text} 
              </Button>
            </div>
  }


  const desktopDeactivateModalView = () => {
    return <Modal
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: "#fff",
                width: 800,
                height: 450,
                bgcolor: 'background.paper',
                border: '2px solid #efefef',
                boxShadow: 24,
                p: 4,
              }}
              open={openDeactivateModal}
              onClose={() => { 
                setOpenDeactivateModal(false)
              }}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              >
                <div style={{ display: "flex", height: 450, justifyContent: "center" }}>
                  <div style={{ background: "#fff", width: "100%", height: "100%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ flexGrow: 1 }}></div>
                      <div style={{ fontSize: 22, padding: 5,paddingTop:10, paddingLeft:20 }}> Deactivate/Delete Account </div>
                      <div style={{ flexGrow: 1 }}></div>
                      <div>
                        <Button
                          color="error" style={{ textTransform: "none" }}
                          onClick={() => {
                            setOpenDeactivateModal(false);
                          }}>
                          <CancelIcon />
                        </Button>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: 30 }}>
                      <div style={{paddingLeft:20}} >
                        <div style={{fontSize:18, }}>
                          Do you really want to delete/deactivate?
                        </div>
                        <div style={{ paddingTop:10,}}>
                          {
                            wrapTextView({ 
                              text:'Current Password', type:"password", 
                              value:passwordDeactivate , setValue:setPasswordDeactivate,
                              show:showPassword, setShow:setShowPassword 
                            })
                          }
                        </div>
                        <div style={{}}>
                          <FormControlLabel 
                            control={<Checkbox size="small" onChange={(e)=>setDeleteAccount(e.target.checked)}  />} 
                            label={
                              <div style={{fontFamily:"serif", }}>
                                I wish to delete my account as well
                              </div>
                            } 
                          />
                        </div>
                        <div style={{ color:"red", width:300}}>
                          {deactivateError && "Error : "+deactivateError.message || error2 && "Error : "+ error2.message}
                        </div>
                        <div style={{ color:"green", width:300}}>
                          {data2 && "Success : "+data2.deactivate}
                        </div>
                        <div style={{  padding: 5, paddingBottom:15, width:300 }} >
                          <div style={{}}>
                            <Link 
                              style={{ textDecoration: "none", color: "#1976d2" }} 
                              to="/account/password/forgot">
                              Forgotten password? 
                            </Link>
                          </div>
                        </div>
                        <div style={{ paddingTop:5}}>
                          {wrapButtonView({text:deleteAccount?'Delete Account':'Deactivate Account', size:"small", onClickfn:onDeactivate })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </Modal>

  }

  const mobileDeactivateModalView = () => {
    return <Modal
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: "#fff",
              width: "100%",
              height: "100%",
              bgcolor: 'background.paper',
              border: '2px solid #efefef',
              boxShadow: 24,
              p: 4,
            }}
            open={openDeactivateModal}
            onClose={() => { 
              setOpenDeactivateModal(false)
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
              <div style={{ display: "flex", height: "100vh", justifyContent: "center" }}>
                <div style={{ background: "#fff", paddingTop:5 , width: "100%", height: "100%" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ fontSize: 18, padding: 5, paddingTop:10, paddingLeft:20 }}> Deactivate/Delete Account </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                      <Button
                        color="error" style={{ textTransform: "none" }}
                        onClick={() => {
                          setOpenDeactivateModal(false);
                        }}>
                        <CancelIcon />
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent:"center", flexDirection:"column", height:"60vh", paddingLeft:20   }}>
                    <div>
                      <div style={{fontSize:16, }} >
                        Do you really want to delete / deactivate?
                      </div>
                      <div style={{ paddingTop:10,width:260 }}>
                        {
                          wrapTextView({ 
                            text:'Current Password', type:"password", 
                            value:passwordDeactivate , setValue:setPasswordDeactivate,
                            show:showPassword, setShow:setShowPassword 
                          })
                        }
                      </div>
                      <div style={{paddingLeft:5}}>
                        <FormControlLabel 
                          control={<Checkbox size="small" onChange={(e)=>setDeleteAccount(e.target.checked)}  />} 
                          label={
                            <div style={{fontFamily:"serif", fontSize:14,}}>
                              I wish to delete my account as well
                            </div>
                          } 
                        />
                      </div>
                      <div  style={{padding:5, color:"red", }}>
                        {deactivateError && "Error : "+deactivateError.message || error2 && "Error : "+ error2.message}
                      </div>
                      <div style={{color:"green", }}>
                        {data2 && "Success : "+data2.deactivate}
                      </div>
                      <div style={{ padding: 5, paddingBottom:15,  }} >
                        <div style={{}}>
                          <Link 
                            style={{ textDecoration: "none", color: "#1976d2" }} 
                            to="/account/password/forgot">
                            Forgotten password? 
                          </Link>
                        </div>
                      </div>
                      <div style={{}}>
                        {wrapButtonView({text:deleteAccount?'Delete Account':'Deactivate Account', size:"small", onClickfn:onDeactivate })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </Modal>
  }

  const getDesktopView = () =>{
    return <div>
            {desktopDeactivateModalView()}
            <div style={{ fontSize:22, paddingBottom:20, padding:5 }}>Settings</div>
            <div style={{fontSize:18, padding:5, paddingBottom:2}}>Change your username</div>
              <div>
                {
                  wrapTextView({ 
                    text:'Check username', type:"username", 
                    value:username, setValue:setPassword,
                    show:true, 
                  })
                }
              </div>
              <div style={{paddingTop:5}}>
                {wrapButtonView({text:'Change Username', size:"small", onClickfn:onChangeUsername})}
              </div>
              <div style={{fontSize:18, padding:5, paddingTop:10, paddingBottom:2}}>Change your password</div>
              <div>
                {
                  wrapTextView({ 
                    text:'Current Password', type:"password", 
                    value:password , setValue:setPassword,
                    show:showPassword, setShow:setShowPassword 
                  })
                }
              </div>
              <div>
                {
                  wrapTextView({ 
                    text:'New Password', type:"password", 
                    value:newpassword , setValue:setNewPassword,
                    show:showNewPassword, setShow:setShowNewPassword 
                  })
                }
              </div>
              <div style={{padding:5, color:"red", width:300}}>
                {changePasswordError && "Error : "+changePasswordError.message || error1 && error1.message}
              </div>
              <div style={{paddingLeft:5, color:"green", width:300}}>
                {data1 && "Success : "+data1.changePassword}
              </div>
              <div style={{ padding: 5 }} >
                <Link 
                  style={{ textDecoration: "none", color: "#1976d2" }} 
                  to="/account/password/forgot">
                  Forgotten password? 
                </Link>
              </div>
              <div style={{paddingTop:5}}>
                {wrapButtonView({text:'Change Password', size:"small", onClickfn:onChangePassword})}
              </div>
              <div>
              </div>
              <div style={{fontSize:18, padding:5, paddingBottom:10,}}>Deactivate your account</div>
              <div style={{display:"flex"}}>
                <div>
                  {wrapButtonView({ text:'Deactivate Account', size:"small", onClickfn:()=>{ setOpenDeactivateModal(true) } })}
                </div>
              </div>
            </div>
  }

  const getMobileView = () =>{
    return <div style={{display:"flex", justifyContent:"center", padding:10}}>
          <div>
            {mobileDeactivateModalView()}
            <div style={{fontSize:18, padding:5, paddingBottom:2}}>Change your username</div>
            <div>
              {
                wrapTextView({ 
                  text:'Check username', type:"username", 
                  value:username, setValue:setPassword,
                  show:true, 
                })
              }
            </div>
            <div style={{paddingTop:5}}>
              {wrapButtonView({text:'Change Username', size:"small", onClickfn:onChangeUsername})}
            </div>
            <div style={{fontSize:18, padding:5, paddingTop:20, paddingBottom:10}}>Change your password</div>
            <div>
              {
                wrapTextView({ 
                  text:'Current Password', type:"password", 
                  value:password , setValue:setPassword,
                  show:showPassword, setShow:setShowPassword 
                })
              }
            </div>
            <div>
              {
                wrapTextView({ 
                  text:'New Password', type:"password", 
                  value:newpassword , setValue:setNewPassword,
                  show:showNewPassword, setShow:setShowNewPassword 
                })
              }
            </div>
            <div style={{padding:5, color:"red", }}>
              {changePasswordError && "Error : "+changePasswordError.message || error1 && error1.message}
            </div>
            <div style={{paddingLeft:5, color:"green", }}>
              {data1 && "Success : "+data1.changePassword}
            </div>
            <div style={{ padding: 5 }} >
              <Link 
                style={{ textDecoration: "none", color: "#1976d2" }} 
                to="/account/password/forgot">
                Forgotten password? 
              </Link>
            </div>
            <div style={{paddingTop:5}}>
              {wrapButtonView({text:'Change Password', size:"small", onClickfn:onChangePassword})}
            </div>
            <div>
              <br/>
            </div>
            <div style={{fontSize:18, padding:5, paddingBottom:10,}}>Deactivate your account</div>
            <div style={{display:"flex"}}>
              <div>
                {wrapButtonView({text:'Deactivate Account', size:"small", onClickfn:()=>{ setOpenDeactivateModal(true); }})}
              </div>
            </div>
          
          </div>

          </div>
  }

  return (
    <div style={{ }}>
      {(width > 800?getDesktopView():<></> )}
      {(width < 800?getMobileView():<></> )}
    </div>
  )

}

export default Settings