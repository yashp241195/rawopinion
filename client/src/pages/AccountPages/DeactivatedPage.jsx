import React from 'react';
import AuthLayoutLocked from '../../hoc/AuthLayoutLocked.jsx';
import Deactivated from '../../features/Account/Deactivated.jsx';
import { Helmet } from 'react-helmet';

const DeactivatedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Deactivated opinion.in</title>
          </Helmet>
  }

  return (
    <div>
      <AuthLayoutLocked>
        {modifyHeader()}
        <Deactivated />
      </AuthLayoutLocked>
    </div>
  )
}

export default DeactivatedPage