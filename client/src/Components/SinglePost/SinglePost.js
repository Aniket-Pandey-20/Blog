import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Context} from '../../Context/Context';
import './SinglePost.css';

function SinglePost() {
  const location = useLocation();
  const path = (location.pathname.split("/")[2]);
  const [post,setPost] = useState({});
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  //for update
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [updateMode,setUpdateMode] = useState(false);


  useEffect(() =>{
    const fetchPost = async ()=>{
      const getPost = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(getPost.data);
      setTitle(getPost.data.title);
      setDesc(getPost.data.desc);
    }
    fetchPost();
  },[path]);

  const handelUpdate =async (e) =>{
    e.preventDefault();
    setUpdateMode(!updateMode);
    console.log(title,desc)
    if(updateMode){
      try{
        await axios.put("http://localhost:5000/api/posts/" + post._id,{
          username : post.username,
          title,
          desc
        });
        window.location.reload();
      }catch(error){
        console.log("Cannot update post because " + error);
      }
    }
  }

  const handelDelete = async (e) =>{
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/posts/" + post._id,{data:{
        username:user.username
      }});
      window.location.replace("/");
      console.log("Deletes successfully")
    } catch (error) {
      console.log("Can't Delete because of " + error);
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={PF + post.photo}
          alt="/"
        />
        {updateMode && <h6 style={{color:"red"}}>Click Update Icon again to update the post</h6>}
        <h1 className="singlePostTitle">
          {updateMode ? <input type="text" className='updateInput' defaultValue={post.title} onChange={e => setTitle(e.target.value)}/> : post.title}
          {post.username === user.username && <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={handelUpdate}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handelDelete}></i>
          </div>}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {updateMode ? <textarea className="updateInput Desc" type="text" defaultValue={post.desc} onChange={e => setDesc(e.target.value)}/> :post.desc}
        </p>
      </div>
    </div>
  )
}

export default SinglePost
