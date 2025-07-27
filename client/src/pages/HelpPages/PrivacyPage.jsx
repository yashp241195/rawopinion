import React from 'react'
import StaticLayout from '../../hoc/StaticLayout'
import Privacy from './../../features/Help/Privacy'
import { Helmet } from 'react-helmet';

const PrivacyPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Privacy opinion.in</title>
          </Helmet>
  }

  return (
    <div>
        <StaticLayout>
          {modifyHeader()}
          <Privacy />
        </StaticLayout>
    </div>
  )
}

export default PrivacyPage