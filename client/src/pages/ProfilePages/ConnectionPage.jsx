import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import Connection from '../../components/Profile/Connection.jsx';
import { Helmet } from 'react-helmet';

const ConnectionPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Connections opinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
        <Connection />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default ConnectionPage