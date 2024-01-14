import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import SavedJobs from '../../components/Work/SavedJobs.jsx';
import { Helmet } from 'react-helmet';

const SavedJobPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Jobs Saved rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <SavedJobs />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default SavedJobPage