import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Recruit from '../../features/Recruit/Recruit.jsx';
import JobsPosted from '../../components/Recruit/JobsPosted.jsx';
import { Helmet } from 'react-helmet';

const JobsPostedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Jobs Posted rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <JobsPosted />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default JobsPostedPage