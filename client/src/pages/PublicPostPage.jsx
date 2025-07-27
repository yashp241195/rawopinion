import React from 'react';
import NoAuthLayout from '../hoc/NoAuthLayout.jsx';
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
      <NoAuthLayout>
        {modifyHeader()}
        <Post visibility="public" />
      </NoAuthLayout>
    </div>
  )
}

export default PostPage
