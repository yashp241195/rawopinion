import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import MyActivities from '../../components/Profile/MyActivities.jsx';
import { Helmet } from 'react-helmet';

const MyActivitiesPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>My Activities rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
        <MyActivities />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default MyActivitiesPage