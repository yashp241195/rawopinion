import React from 'react';
import AuthLayoutLocked from '../../hoc/AuthLayoutLocked.jsx';
import Banned from '../../features/Account/Banned.jsx';
import { Helmet } from 'react-helmet';

const BannedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Banned opinion.in</title>
          </Helmet>
  }

  return (
    <div>
      <AuthLayoutLocked>
        {modifyHeader()}
        <Banned />
      </AuthLayoutLocked>
    </div>
  )
}

export default BannedPage