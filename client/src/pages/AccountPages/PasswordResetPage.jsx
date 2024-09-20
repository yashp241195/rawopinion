import React from 'react';
import StaticLayout from '../../hoc/StaticLayout.jsx';
import PasswordReset from '../../features/Account/PasswordReset.jsx';
import { Helmet } from 'react-helmet';

const PasswordResetPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>PasswordReset rawopinion.in</title>
          </Helmet>
  }

  return (
    <div>
      <StaticLayout>
        {modifyHeader()}
        <PasswordReset />
      </StaticLayout>
    </div>
  )
}

export default PasswordResetPage