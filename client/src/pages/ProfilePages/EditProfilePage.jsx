import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import EditProfile from '../../components/Profile/EditProfile.jsx';
import { Helmet } from 'react-helmet';

const EditProfilePage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>EditProfile opinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
        <EditProfile />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default EditProfilePage