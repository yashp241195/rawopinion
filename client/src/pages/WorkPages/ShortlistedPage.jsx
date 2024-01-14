import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import Shortlisted from '../../components/Work/Shortlisted.jsx';
import { Helmet } from 'react-helmet';

const ShortlistedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Shortlisted rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <Shortlisted />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default ShortlistedPage