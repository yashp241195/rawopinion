import React from 'react';
import AuthLayoutLocked from '../../hoc/AuthLayoutLocked.jsx';
import Essential from '../../features/Essential/Essential.jsx';
import { Helmet } from 'react-helmet';

const EssentialPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Essential rawopinion.in</title>
          </Helmet>
  }
  return (
    <div>
      <AuthLayoutLocked>
        {modifyHeader()}
        <Essential />
      </AuthLayoutLocked>
    </div>
  )
}

export default EssentialPage