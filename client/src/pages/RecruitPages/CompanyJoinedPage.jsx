import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Recruit from '../../features/Recruit/Recruit.jsx';
import CompanyJoined from '../../components/Recruit/CompanyJoined.jsx';
import { Helmet } from 'react-helmet';

const CompanyJoinedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Company Joined rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <CompanyJoined />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default CompanyJoinedPage