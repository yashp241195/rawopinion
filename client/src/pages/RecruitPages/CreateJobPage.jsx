import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Recruit from '../../features/Recruit/Recruit.jsx';
import CreateJobPost from '../../components/Recruit/CreateJobPost.jsx';
import { Helmet } from 'react-helmet';

const CreateJobPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Create Job rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <CreateJobPost />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default CreateJobPage