import React from 'react'
import StaticLayout from '../../hoc/StaticLayout'
import Terms from './../../features/Help/Terms'
import { Helmet } from 'react-helmet';

const TermsPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Terms rawopinion.in</title>
          </Helmet>
  }

  return (
    <div>
        <StaticLayout>
          {modifyHeader()}
          <Terms />
        </StaticLayout>
    </div>
  )
}

export default TermsPage