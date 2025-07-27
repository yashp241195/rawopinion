import React from 'react'
import NavbarNoAuth from '../features/Navbar/NavbarNoAuth'
import Footer from '../features/Footer/Footer'
import useWindowSize from '../hooks/useWindowSize'
import { useReactiveVar } from '@apollo/client'
import authVar from '../vars/authVar'
import { Navigate } from 'react-router-dom'


const NoAuthLayout = (props) => {

  const [width, ] = useWindowSize()

  const styles = {
    centerHorizontal: {
      display: "flex", alignItems: "center", justifyContent: "center",
    }, 
    fixWidthDesktop:{
      width:900
    },
    fullWidthMobile:{
      width:"100%",
    },
    flexVertical:{
      display: "flex", flexDirection: "column", height: "97vh" 
    }
  }

  const getDesktopView = () => {
    return <div style={styles.flexVertical}>
      <div style={styles.centerHorizontal}>
        <div style={styles.fixWidthDesktop}>
          <NavbarNoAuth />
        </div>
      </div>
      <div style={styles.centerHorizontal}>
        <div style={styles.fixWidthDesktop}>
          {props.children}
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={styles.centerHorizontal}>
        <div style={styles.fullWidthMobile}>
          <Footer />
        </div>
      </div>
    </div>
  }

  const getMobileView = () => {
    return <div style={styles.flexVertical}>
      <div style={styles.centerHorizontal}>
        <div style={styles.fullWidthMobile}>
          <NavbarNoAuth />
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={styles.centerHorizontal}>
        <div style={{...styles.fullWidthMobile, transform:"scale(0.9)",}}>
          {props.children}
        </div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{...styles.centerHorizontal, transform:"scale(0.90)", }}>
        <div style={styles.fullWidthMobile}>
          <Footer />
        </div>
      </div>
    </div>
  }
  
  const auth = useReactiveVar(authVar)

  return (
    <div>
      {
        auth && auth.token?
          <div>
            <Navigate to="/explore/feeds/content/1" />
          </div>
          :
          <div>
            {(width > 800) ? getDesktopView():<></>}
            {(width < 800) ? getMobileView():<></>}
          </div>
      }
    </div>
  )
}

export default NoAuthLayout
