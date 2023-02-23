import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Context} from '../../Context/Context';
function Navbar() {
  const {user,dispatch} = useContext(Context);
  const currentUser = user;
  const url_part = window.location.href.split('/')[3];

  const handelLogout = () =>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <nav>
      <div className='section1'>
        <Link className='link' to='/'> HOME</Link>
        <Link className='link' to='/about'>ABOUT</Link>
        <Link className='link' to='/contact'>CONTACT</Link>
        <Link className='link' to='/write'>WRITE</Link>
      </div>
      <div className='section2'>
        {currentUser ? (
        <Link className='profil-link' to='/setting'>
          <img src={user.profilPhoto} alt="!!"/>
        </Link>
        ):
        <Link className='ButtonLink' to='/register'>Register</Link>
        }
        <Link className='ButtonLink' to='/login' onClick={currentUser && handelLogout}>{currentUser? 'Logout' : 'Login'}</Link>
      </div>
    </nav>
  )
}

export default Navbar

