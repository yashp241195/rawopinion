import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';
import Explore from '../features/Explore/Explore.jsx'
import { Helmet } from 'react-helmet';

const SavedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Saved rawopinion.in</title>
          </Helmet>
  }


  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <Explore />
      </AuthLayout>
    </div>
  )
}

export default SavedPage
