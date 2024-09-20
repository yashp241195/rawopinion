import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import ProfileView from '../../components/Profile/ProfileView.jsx'
import { Helmet } from 'react-helmet';
import {useParams} from 'react-router-dom'

const ProfileViewPage = () => {

  const { username } = useParams()

  const modifyHeader = () => {
    return <Helmet>
      <title>{username} rawopinion.in</title>
    </Helmet>
  }

  return (
      <AuthLayoutFullScreen>
        {modifyHeader()}
        <div style={{ height:"80vh", display:"flex", justifyContent:"center", overflowY:"auto" }}>
            <ProfileView username={username} />
        </div>
      </AuthLayoutFullScreen> 
  )
}

export default ProfileViewPage