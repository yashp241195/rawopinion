import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';

import Recruit from '../../features/Recruit/Recruit.jsx';
import CreateCompany from '../../components/Recruit/CreateCompany.jsx';

import { Helmet } from 'react-helmet';

const CreateCompanyPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Create Company rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Recruit>
        <CreateCompany />
      </Recruit>
    </AuthLayoutFullScreen>
  )
}

export default CreateCompanyPage