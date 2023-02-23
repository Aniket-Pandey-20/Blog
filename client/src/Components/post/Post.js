import React from 'react'
import { Link } from 'react-router-dom';
import './Post.css';

function Post({post}) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className='postContainer'>
      <div className='top-img section'>
         {post.photo && <img  className="postImg" src={PF + post.photo} alt="" width = "385px" height = "240px"/>}
        
        <div className="postCats">
          {post.categories.map((c,index) =>(
            <span key={index} className="postCat"><Link className="link" to={`/posts?cat=${c}`} style={{color: '#be9656'}}>
              {c.toUpperCase()}
            </Link>
          </span>
          ))}
          
        </div>
      </div>
      <div className='post-info section'>
        <h1 className='post-Heading'>
          <Link to={`/post/${post._id}`}className='link'>{post.title}</Link>
        </h1>
        <hr />
        <span className="post-Date">{new Date(post.createdAt).toDateString()}</span>

        <p className="post-Desc">
        {post.desc}
      </p>
      </div>
    </div>
  )
}

export default Post
