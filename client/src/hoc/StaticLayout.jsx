import React from 'react'
import NavbarStatic from '../features/Navbar/NavbarStatic'
import Footer from '../features/Footer/Footer'
import useWindowSize from '../hooks/useWindowSize'

const StaticLayout = (props) => {

  const [width, ] = useWindowSize();

  const styles = {
    centerHorizontal: {
      display: "flex", alignItems: "center", justifyContent: "center"
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

    return (
      <div style={styles.centerHorizontal}>
      <div style={styles.flexVertical}>
        <div style={styles.centerHorizontal}>
          <div style={styles.fixWidthDesktop}>
            <NavbarStatic />
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={styles.centerHorizontal}>
          <div style={styles.fixWidthDesktop}>
            {props.children}
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={styles.centerHorizontal}>
          <Footer />
        </div>
      </div>
      </div>
    )
  }

  const getMobileView = () => {

    return (
      <div style={{...styles.flexVertical, }}>
        <div style={styles.centerHorizontal}>
          <div style={{...styles.fixWidthDesktop,  }}>
            <NavbarStatic />
          </div>
        </div>
        <div style={{...styles.centerHorizontal, flexGrow: 1 }}>
          <div style={{...styles.fullWidthMobile,}}>
            {props.children}
          </div>
        </div>
        <div style={{...styles.centerHorizontal, transform:"scale(0.90)", }}>
          <Footer />
        </div>
      </div>
    )
  }

  return <div>
          {(width > 800) ? getDesktopView():<></>}
          {(width < 800) ? getMobileView():<></>}
        </div>

}

export default StaticLayout
