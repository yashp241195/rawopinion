import React from 'react'
import { Link } from 'react-router-dom'

import useWindowSize from '../../hooks/useWindowSize'

const Footer = () => {

  const wrap = (item) => {
    const { name, url, } = item
    const linkColor = "#808080"
    return <div style={{ textDecoration: "none", fontSize: 18 }}><Link style={{ textDecoration: 'none', color: linkColor }} to={url}>{name}</Link></div>
  }

  const listoflinks = [

    { name: "About", url: "/help/about" },
    { name: "Help", url: "/help/center" },
    { name: "Privacy", url: "/help/privacy" },
    { name: "Terms", url: "/help/terms" },
    { name: "FAQs", url: "/help/faqs" },
    { name: "Login", url: "/login" },
    { name: "Signup", url: "/signup" },
  ]

  const [width] = useWindowSize()

  const getDesktopFooter = () => {
    return <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",  }}>
        {listoflinks.map((it, i) => <div style={{ padding: 5 }} key={i}>{wrap(it)}</div>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
        <div>
          <div style={{ paddingTop: 2, color: "#808080" }}>
            <span style={{ fontSize: 16 }}>RawOpinion</span>
            <span style={{ fontSize: 16 }}> © {new Date().getFullYear()} </span>
          </div>
        </div>
      </div>
    </div>
  }

  const listoflinksmobile = [

    { name:"About", url:"/help/about"},
    { name: "Help", url: "/help/center" },
    { name: "Privacy", url: "/help/privacy" },
    { name:"Terms", url:"/help/terms"},
    { name: "FAQs", url: "/help/faqs" },
    { name: "Login", url: "/login" },
    { name:"Signup", url:"/signup"},
  ]

  const wrapMobile = (item) => {
    const { name, url, } = item
    const linkColor = "#808080"
    return <div style={{ textDecoration: "none", fontSize: 12 }}><Link style={{ textDecoration: 'none', color: linkColor }} to={url}>{name}</Link></div>
  }


  const getMobileFooter = () => {
    return <div>
      <div style={{ display: "flex", justifyContent:"center" }}>
        {listoflinksmobile.map((it, i) => <div style={{ padding: 5 }} key={i}>{wrapMobile(it)}</div>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
        <div>
          <div style={{ paddingTop: 2, color: "#808080" }}>
            <span style={{ fontSize: 15 }}>RawOpinion</span>
            <span style={{ fontSize: 15 }}> © {new Date().getFullYear()} </span>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      {(width > 800) ? getDesktopFooter() : <></>}
      <br />
      {(width < 600) ? getMobileFooter() : <></>}
    </div>
  )
}

export default Footer