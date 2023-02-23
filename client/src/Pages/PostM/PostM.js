import React from 'react'
import SideBar from '../../Components/Sidebar/SideBar'
import SinglePost from '../../Components/SinglePost/SinglePost';
import './PostM.css';

function Post() {
  return (
    <div className='postPageWraper'>
      <SinglePost/>
      <SideBar/>
    </div>
  )
}

export default Post
