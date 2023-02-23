import React, { useContext, useRef } from 'react';
import {Context} from '../../Context/Context';
import axios from 'axios';
import "./login.css";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const{dispatch,isFetching} = useContext(Context);

  const handelSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',{
        username: userRef.current.value,
        password:passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
      alert("User not found");
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  

  return (
    <div className='loginConatiner'>
      <div className='loginCard'>
        <h2 className='login-title'>Login</h2>
        <form className='loginForm' onSubmit={handelSubmit}>
          <input type='text' id='username' name='username'placeholder='Username' ref={userRef}/>
          <input type='password' id='password' name='Password' placeholder='Password' ref={passwordRef}/>
          <button type='submit' disabled={isFetching}>Login</button>
          <div className='register_text' style={{color:'black'}}>Don't have a account  ? <a href='' >Register</a></div>
        </form>
      </div>
    </div>
  )
}

export default Login

