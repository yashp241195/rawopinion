import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import Settings from '../../components/Profile/Settings.jsx';
import { Helmet } from 'react-helmet';

const SettingsPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Settings rawopinion.in</title>
          </Helmet>
  }
  
  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
        <Settings />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default SettingsPage