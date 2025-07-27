import React from 'react'
import { Link, } from "react-router-dom";

import useWindowSize from '../../hooks/useWindowSize';
import { APP_ICON } from '../../config/config';

const NavbarStatic = () => {

  const [width,] = useWindowSize()
  const imgurl = APP_ICON
  

  const wrapHead = (imgurl, url, text) => {
    return <Link to={url} style={{ textDecoration: 'none', color: "#000" }}>
      <div style={{ display: "flex",  }}>
        <div style={{ padding: 2, paddingTop: 9 }}>
          <img src={imgurl} alt={text} height="33" />
        </div>
        <div style={{ paddingTop: 10, paddingLeft:10, fontSize: 26, fontFamily: "serif", }}>
            Opinion
        </div>
      </div>
    </Link>
  }

  const getDesktopNavbar = () => {
    return <nav>
      <div style={{ display: "flex", listStyle: "none", }}>
        <div style={{ width: 220, paddingLeft: 10 }}>
          {wrapHead(imgurl, '/login', 'dateze')}
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ width: 100 }}>
        </div>
        <div style={{ width: 120 }}>
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
            Opinion
          </div>
      </div>
    </div>
  }

  return (
    <div>
      {(width > 800) ? getDesktopNavbar() : <></>}
      {(width < 800) ? getMobileNavbar() : <></>}
    </div>
  )
}

export default NavbarStatic