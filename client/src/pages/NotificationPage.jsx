import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';

import Notification from '../features/Notification/Notification.jsx'
import { Helmet } from 'react-helmet';

const NotificationPage = () => {
  const modifyHeader = () => {
    return <Helmet>
            <title>Notifications opinion.in</title>
          </Helmet>
  }
  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <Notification />
      </AuthLayout>
    </div>
  )
}

export default NotificationPage
