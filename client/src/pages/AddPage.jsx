import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';
import AddNew from '../features/AddNew/AddNew.jsx'
import { Helmet } from 'react-helmet';

const AddPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Add New opinion.in</title>
          </Helmet>
  }


  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <AddNew />
      </AuthLayout>
    </div>
  )
}

export default AddPage
