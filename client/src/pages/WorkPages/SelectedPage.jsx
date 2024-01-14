import React from 'react'
import AuthLayoutFullScreen from '../../hoc/AuthLayoutFullScreen.jsx';
import Work from '../../features/Work/Work.jsx';
import Selected from '../../components/Work/Selected.jsx';
import { Helmet } from 'react-helmet';

const SelectedPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Selected rawopinion.in</title>
          </Helmet>
  }

  return (
    <AuthLayoutFullScreen>
      {modifyHeader()}
      <Work>
        <Selected />
      </Work>
    </AuthLayoutFullScreen>
  )
}

export default SelectedPage