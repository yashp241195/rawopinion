import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Profile from '../../features/Profile/Profile.jsx';
import PagesJoined from '../../components/Profile/PagesJoined.jsx';
import { Helmet } from 'react-helmet';

const PagesJoinedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>PagesJoined rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Profile>
        <PagesJoined />
      </Profile>
    </AuthLayoutFullScreen>
  )
}

export default PagesJoinedPage