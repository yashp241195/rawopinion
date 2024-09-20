import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import ProfileView from '../../components/Profile/ProfileView.jsx'
import { Helmet } from 'react-helmet';

const ProfileShowPage = () => {

  const modifyHeader = () => {
    return <Helmet>
      <title>MyProfile rawopinion.in</title>
    </Helmet>
  }

  return (
      <AuthLayoutFullScreen>
        {modifyHeader()}
          <Profile>
            <ProfileView />
          </Profile>
      </AuthLayoutFullScreen> 
  )
}

export default ProfileShowPage