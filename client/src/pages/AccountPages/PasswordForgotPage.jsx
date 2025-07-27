import React from 'react';
import StaticLayout from '../../hoc/StaticLayout.jsx';
import PasswordForgot from '../../features/Account/PasswordForgot.jsx'
import { Helmet } from 'react-helmet';

const PasswordForgotPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>PasswordForgot opinion.in</title>
          </Helmet>
  }

  return (
    <div>
      <StaticLayout>
        {modifyHeader()}
        <PasswordForgot />
      </StaticLayout>
    </div>
  )
}

export default PasswordForgotPage