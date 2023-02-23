import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Posts from '../../Components/Posts/Posts';
import SideBar from '../../Components/Sidebar/SideBar';
import axios from 'axios';
import './Home.css';

function Home() {
const [posts,setPosts] = useState([]);
const {search} = useLocation();

 useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  },[search]);

  return (
    <div>
        <Header/>
        {search && <h1 className='specificHeading'>{`${search.split('=')[1].toUpperCase()}${search.split('=')[0]==='?cat'? ' Related':"'s"} Posts`}</h1>}
        <div className='homeSection2'>
          <Posts posts={posts}/>
          <SideBar/>
        </div>
    </div>
  )
}

export default Home
