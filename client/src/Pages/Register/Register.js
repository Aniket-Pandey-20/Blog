import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Register() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(false);

  const handelSubmit =async (e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res =await axios.post('http://localhost:5000/api/auth/register',{
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (error) {
      setError(true);
    }
  };
  
  return (
    <div className='registerConatiner'>
      <div className='registerCard'>
        <h2 className='register-title'>Register</h2>
        <form className='registerForm' onSubmit={handelSubmit}>
          <input type='text' id='username' name='Username'placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
          <input type='email' id='email' name='Email'placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' id='password' name='Password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Register</button>
          <div className='login_text' style={{color:'white'}}>Already have a account ?<a>Login</a></div>
        </form>
      </div>
      {error && <span style={{color:'red',fontWeight:'bolder'}}>Something went wrong!!</span>}
    </div>
  )
}

export default Register
