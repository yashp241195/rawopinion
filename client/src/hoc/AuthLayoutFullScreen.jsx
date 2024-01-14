import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'
import NavbarAuth from '../features/Navbar/NavbarAuth'
import authVar from '../vars/authVar'
import { useReactiveVar } from '@apollo/client';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material'
import internetVar from '../vars/internetVar'

const AuthLayoutFullScreen = (props) => {

  const [width, ] = useWindowSize()
  const isAuth =  useReactiveVar(authVar)
  const navigate = useNavigate()
  const hasInternet = useReactiveVar(internetVar)

  const styles = {
    centerHorizontal: {
      display: "flex", alignItems: "center", justifyContent: "center"
    },
    fixWidthDesktop: {
      width: 900
    },
    fullWidthMobile: {
      width: "100%",
    },
    flexVertical: {
      display: "flex", flexDirection: "column", height: "97vh"
    }
  }

  const saveToLocalDirect = (key, value) => localStorage.setItem(key, value)


  const getDesktopView = () => {
    return <div style={styles.flexVertical}>
      <div style={styles.centerHorizontal}>
        <div style={styles.fixWidthDesktop}>
          <NavbarAuth />
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={styles.centerHorizontal}>
        <div style={styles.fixWidthDesktop}>
        {
            hasInternet?
            props.children
            :
            <div style={{display:"flex", justifyContent:"center" , color:"#595959"}}>
              <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <CloudOffIcon sx={{fontSize:40}} /> 
                </div>
                <div style={{fontSize:18, paddingTop:10}}>
                  You are offline
                </div>
                <div style={{display:"flex", justifyContent:"center", paddingTop:10}}>
                  <Button
                  onClick={()=>{ 
                    saveToLocalDirect("hasInternet",true)
                    navigate(0)  
                  }} 
                  size="small"
                  style={{textTransform:"none"}}
                  variant='outlined'
                  startIcon={<RefreshIcon />}
                  >
                    Refresh
                  </Button>
                  
                </div>
                
              </div>
            </div>
          }
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
    </div>
  }

  const getMobileView = () => {
    return <div style={styles.flexVertical}>
      <div style={styles.centerHorizontal}>
        <div style={styles.fullWidthMobile}>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={styles.centerHorizontal}>
        <div style={{...styles.fullWidthMobile, }}>
        {
            hasInternet?
            props.children
            :
            <div style={{display:"flex", justifyContent:"center" , color:"#595959"}}>
              <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <CloudOffIcon sx={{fontSize:40}} /> 
                </div>
                <div style={{fontSize:18, paddingTop:10}}>
                  You are offline
                </div>
                <div style={{display:"flex", justifyContent:"center", paddingTop:10}}>
                  <Button
                  onClick={()=>{ 
                    saveToLocalDirect("hasInternet",true)
                    navigate(0)  
                  }} 
                  size="small"
                  style={{textTransform:"none"}}
                  variant='outlined'
                  startIcon={<RefreshIcon />}
                  >
                    Refresh
                  </Button>
                  
                </div>
                
              </div>
            </div>
          }
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={styles.centerHorizontal}>
        <div style={styles.fullWidthMobile}>
        </div>
      </div>
    </div>
  }


  return <div>
          {
            isAuth && isAuth.token?
              <div>
                {(width > 800) ? getDesktopView():<></>}
                {(width < 800) ? getMobileView():<></>}
              </div>
              :
              <div>
                <Navigate to="/" />
              </div>
          }
        </div>
  
}

export default AuthLayoutFullScreen

