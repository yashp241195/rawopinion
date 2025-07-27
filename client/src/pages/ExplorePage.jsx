import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';

import Explore from '../features/Explore/Explore.jsx'
import { Helmet } from 'react-helmet';

const ExplorePage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Explore opinion.in</title>
          </Helmet>
  }


  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <Explore />
      </AuthLayout>
    </div>
  )
}

export default ExplorePage
