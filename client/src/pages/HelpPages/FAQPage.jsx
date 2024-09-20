import React from 'react'
import StaticLayout from '../../hoc/StaticLayout'
import FAQ from './../../features/Help/FAQ'
import { Helmet } from 'react-helmet';

const FAQPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>FAQ rawopinion.in</title>
          </Helmet>
  }

  return (
    <div>
        <StaticLayout>
          {modifyHeader()}
          <FAQ />
        </StaticLayout>
    </div>
  )
}

export default FAQPage