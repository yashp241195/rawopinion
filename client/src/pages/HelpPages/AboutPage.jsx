import React from 'react'
import About from '../../features/Help/About'
import StaticLayout from '../../hoc/StaticLayout'
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  
  const modifyHeader = () => {
    return <Helmet>
            <title>About opinion.in</title>
          </Helmet>
  }
  
  return (
    <div>
        <StaticLayout>
          {modifyHeader()}
          <About />
        </StaticLayout>
    </div>
  )
}

export default AboutPage