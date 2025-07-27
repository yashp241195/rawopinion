import React from 'react'
import AuthLayout from '../../hoc/AuthLayout.jsx';
import ProfileOptions from '../../features/Profile/ProfileOptions.jsx';
import { Helmet } from 'react-helmet';

const ProfileOptionPage = () => {

    const modifyHeader = () => {
        return <Helmet>
                <title>Profile opinion.in</title>
              </Helmet>
    }
    
    return (
        <AuthLayout>
            {modifyHeader()}
            <div>
                <ProfileOptions />
            </div>
        </AuthLayout>
  )
}

export default ProfileOptionPage