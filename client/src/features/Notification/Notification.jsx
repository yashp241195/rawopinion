import React from 'react'
import { default as NotifyComponent } from '../../components/Notification/Notification'

const Notification = () => {

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{ display:"flex", flexDirection:"column" }}>
          <NotifyComponent />
        </div>
    </div>
  )
}

export default Notification