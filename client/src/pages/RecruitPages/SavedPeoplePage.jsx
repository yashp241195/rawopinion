import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Recruit from '../../features/Recruit/Recruit.jsx';
import SavedPeople from '../../components/Recruit/SavedPeople.jsx';
import { Helmet } from 'react-helmet';

const SavedPeoplePage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Saved People rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <SavedPeople />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default SavedPeoplePage