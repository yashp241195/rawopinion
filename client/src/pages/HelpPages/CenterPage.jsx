import React from 'react'
import StaticLayout from '../../hoc/StaticLayout'
import Center from './../../features/Help/Center'
import { Helmet } from 'react-helmet';

const CenterPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Center opinion.in</title>
          </Helmet>
  }

  return (
    <div>
        <StaticLayout>
          {modifyHeader()}
          <Center />
        </StaticLayout>
    </div>
  )
}

export default CenterPage