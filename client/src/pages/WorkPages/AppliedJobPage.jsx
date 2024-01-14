import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import AppliedJobs from '../../components/Work/AppliedJobs.jsx';
import { Helmet } from 'react-helmet';

const AppliedJobPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Applied Jobs rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <AppliedJobs />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default AppliedJobPage