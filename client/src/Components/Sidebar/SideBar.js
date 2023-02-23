import React, { useContext } from 'react'
import { useEffect , useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Sidebar.css';
import {Context} from'../../Context/Context';
const imgUrl = '../../../public/img/profilPhoto.jpg';

function SideBar() {
  const{user} = useContext(Context);

  const[cats,setCats] = useState([]);

  useEffect(()=>{
    const getCats=async ()=>{
      const res = await axios.get('http://localhost:5000/api/categories');
      setCats(res.data);
    }
    getCats();
  },[])

  return (
    <div className='sideBar'>
      <div className='sidebarItem'>
        <div className='sidebarTitle' style={{'width':'90%'}}>ABOUT ME</div>
        <img
          src={user ? user.profilPhoto:'/'}
          alt=""
        />
        <p>Hello There! I am Aniket Pandey
          a budding Software Developer and a Forntend Developerand.
          On this website i express my thoughts using words.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle" >CATEGORIES</span>
        <ul className="sidebarList">
          
          {cats.map((cat,index)=>(
            <li key={index}  className="sidebarListItem">
            <Link className="link" to={`/posts?cat=${cat.name}`}>
              {cat.name.toUpperCase()}
            </Link>
            </li>
          ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )
}

export default SideBar
