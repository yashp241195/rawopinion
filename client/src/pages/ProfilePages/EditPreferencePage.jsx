import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import EditPreference from '../../components/Profile/EditPreference.jsx';
import { Helmet } from 'react-helmet';

const EditPreferencePage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>EditPreference rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
          <EditPreference />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default EditPreferencePage