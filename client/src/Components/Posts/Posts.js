import React from 'react'
import './Posts.css';
import Post
 from '../post/Post';
function Posts({posts}) {
  return (
    <div className='postsContainer'>
        {posts.map((post) => (
          <Post key = {post._id} post={post}/>
      ))}
    </div>
  )
}

export default Posts
