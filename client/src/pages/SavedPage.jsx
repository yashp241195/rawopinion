import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';
import Saved from '../features/Saved/Saved.jsx'
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
        <Saved />
      </AuthLayout>
    </div>
  )
}

export default SavedPage
