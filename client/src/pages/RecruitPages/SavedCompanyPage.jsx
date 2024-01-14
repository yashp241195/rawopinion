import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Recruit from '../../features/Recruit/Recruit.jsx';
import SavedCompanies from '../../components/Recruit/SavedCompanies.jsx';
import { Helmet } from 'react-helmet';

const SavedPeopleOrCompanyPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Saved Companies rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <SavedCompanies />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default SavedPeopleOrCompanyPage