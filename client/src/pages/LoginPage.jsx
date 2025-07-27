import React from 'react';
import NoAuthLayout from '../hoc/NoAuthLayout';
import Login from '../features/Login/Login';
import { Helmet } from 'react-helmet';

function LoginPage() {

  const modifyHeader = () => {
      return <Helmet>
              <title>Login opinion.in</title>
          </Helmet>
  }

  return (
    <NoAuthLayout>
      {modifyHeader()}
      <Login />
    </NoAuthLayout>
  );
}

export default LoginPage;

