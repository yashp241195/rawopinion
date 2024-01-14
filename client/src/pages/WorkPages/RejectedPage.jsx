import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import Rejected from '../../components/Work/Rejected.jsx';
import { Helmet } from 'react-helmet';

const RejectedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Rejected rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <Rejected />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default RejectedPage