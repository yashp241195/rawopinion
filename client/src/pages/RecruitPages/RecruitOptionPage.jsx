import React from 'react'
import AuthLayout from '../../hoc/AuthLayout.jsx';
import RecruitOptions from '../../features/Recruit/RecruitOptions.jsx';
import { Helmet } from 'react-helmet';

const RecruitOptionPage = () => {

    const modifyHeader = () => {
        return <Helmet>
                <title>Recruit rawopinion.in</title>
              </Helmet>
    }
    
    return (
        <AuthLayout>
            {modifyHeader()}
            <div>
                <RecruitOptions />
            </div>
        </AuthLayout>
  )
}

export default RecruitOptionPage