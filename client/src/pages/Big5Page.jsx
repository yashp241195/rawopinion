import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';
import Big5 from '../features/Big5/Big5.jsx'
import { Helmet } from 'react-helmet';

const Big5Page = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Big 5 rawopinion.in</title>
          </Helmet>
  }

  return (
    <div>
      {modifyHeader()}
      <AuthLayout>
        <Big5 />
      </AuthLayout>
    </div>
  )
}

export default Big5Page
