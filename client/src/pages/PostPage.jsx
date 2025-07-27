import React from 'react';
import AuthLayout from '../hoc/AuthLayout.jsx';
import Post from '../components/Post/Post.jsx'


import { Helmet } from 'react-helmet';

const PostPage = () => {

  const modifyHeader = () => {
    return <Helmet>
            <title>Post opinion.in</title>
          </Helmet>
  }


  return (
    <div>
      <AuthLayout>
        {modifyHeader()}
        <Post />
      </AuthLayout>
    </div>
  )
}

export default PostPage
