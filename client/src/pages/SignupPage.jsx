import React from 'react';
import NoAuthLayout from '../hoc/NoAuthLayout';
import Signup from '../features/Signup/Signup';
import { Helmet } from 'react-helmet';

function SignupPage() {

  const modifyHeader = () => {
    return <Helmet>
            <title>Signup opinion.in</title>
          </Helmet>
  }

  return (
    <NoAuthLayout>
      {modifyHeader()}
      <Signup />
    </NoAuthLayout>
  );
}

export default SignupPage;

