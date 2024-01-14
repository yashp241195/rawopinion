import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import MyWorkHistory from '../../components/Work/MyWorkHistory.jsx';
import { Helmet } from 'react-helmet';

const MyWorkHistoryPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>My Work History rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <MyWorkHistory />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default MyWorkHistoryPage