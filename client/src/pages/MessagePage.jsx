import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';

import Message from '../features/Message/Message.jsx'
import { Helmet } from 'react-helmet';

const MessagePage = () => {
  const modifyHeader = () => {
    return <Helmet>
            <title>Messages opinion.in</title>
          </Helmet>
  }
  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <Message />
      </AuthLayout>
    </div>
  )
}

export default MessagePage
