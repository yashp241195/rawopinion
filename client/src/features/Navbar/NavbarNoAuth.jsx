import React from 'react'
import { Link, useLocation } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import useWindowSize from '../../hooks/useWindowSize';
import { APP_ICON } from '../../config/config';


const NavbarNoAuth = () => {

  const currentpath = useLocation().pathname
  const [width,] = useWindowSize()
  const imgurl = APP_ICON

  const wrapNav = (url, text, icon) => {
    const linkColor = (url === currentpath) ? "#000" : "#808080"
    return <div>
      <Link to={url} style={{ textDecoration: 'none', color: linkColor }}>
        <div style={{ display: "flex" }}>
          <div style={{ padding: 7 }}>
            {icon}
          </div>
          <div style={{ padding: 10, paddingLeft:5, paddingTop:8, fontSize:20 }}>
            {text}
          </div>
        </div>
      </Link>
    </div>
  }

  const wrapHead = (imgurl, url, text) => {
    return <Link to={url} style={{ textDecoration: 'none', color: "#000" }}>
      <div style={{ display: "flex",  }}>
        <div style={{ padding: 2, paddingTop: 9 }}>
          <img src={imgurl} alt={text} height="33" />
        </div>
        <div style={{ paddingTop: 10, paddingLeft:10, fontSize: 26, fontFamily: "serif", }}>
            RawOpinion
        </div>
      </div>
    </Link>
  }

  const getDesktopNavbar = () => {
    return <nav>
      <div style={{ display: "flex", listStyle: "none", width:900 }}>
        <div style={{ width: 220, paddingLeft: 10 }}>
          {wrapHead(imgurl, '/login', '')}
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ width: 100 }}>
          {wrapNav('/login', 'Login', <div style={{ paddingTop: 2 }}><LoginIcon sx={{ fontSize: 24 }} /></div>)}
        </div>
        <div style={{ width: 120 }}>
          {wrapNav('/signup', 'Signup', <PersonAddAlt1Icon sx={{ fontSize: 26 }} />)}
        </div>
      </div>
    </nav>
  }

  const getMobileNavbar = () => {
    return <div style={{ display: "flex", listStyle: "none", width:"100%" }}>
      <div style={{ display:"flex", marginLeft: 15 }}>
        <div style={{ display: "flex" }}>
          <div style={{ padding: 5, paddingTop: 10 }}>
            <img src={imgurl} alt="t1" height="32" width="32" />
          </div>
        </div>
        <div style={{ fontSize: 26, fontFamily:"serif", paddingTop: 10, paddingLeft:5   }}>
            RawOpinion
          </div>
      </div>
    </div>
  }

  return (
    <div style={{}}>
      {(width > 800) ? getDesktopNavbar() : <></>}
      {(width < 800) ? getMobileNavbar() : <></>}
    </div>
  )
}

export default NavbarNoAuth