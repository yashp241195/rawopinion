import React from 'react';
import NoAuthLayout from '../../hoc/NoAuthLayout.jsx';
import EmailVerify from '../../features/Account/EmailVerify.jsx';
import { Helmet } from 'react-helmet';

const EmailVerifyPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>EmailVerify opinion.in</title>
          </Helmet>
  }

  return (
    <div>
      <NoAuthLayout>
        {modifyHeader()}
        <EmailVerify />
      </NoAuthLayout>
    </div>
  )
}

export default EmailVerifyPage