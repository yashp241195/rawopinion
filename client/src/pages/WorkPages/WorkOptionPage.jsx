import React from 'react'
import AuthLayout from '../../hoc/AuthLayout.jsx';
import WorkOptions from '../../features/Work/WorkOptions.jsx';
import { Helmet } from 'react-helmet';

const WorkOptionPage = () => {

    const modifyHeader = () => {
        return <Helmet>
                <title>Work rawopinion.in</title>
              </Helmet>
    }
    
    return (
        <AuthLayout>
            {modifyHeader()}
            <div>
                <WorkOptions />
            </div>
        </AuthLayout>
  )
}

export default WorkOptionPage