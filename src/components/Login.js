import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    try {
     await signInWithEmailAndPassword(auth,email,password);
     navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='form-container'>
      <div className="mainInfo">
        <img src="./img/flash.png" alt="" />
        <h1>FlashChat</h1>
        <p>The most user friendly chat application.</p>
      </div>
      <div className="form-wrap">
        <span className="logo">LogIn</span>
        <form onSubmit={handleSubmit}>
          <input type="email" name='email' placeholder='email' />
          <input type="password" name='password' placeholder='password' />
          <button>Sign in</button>
        </form>
        <p>You dont't have account?<Link to='/signup'> Signup</Link></p>
      </div>
    </div>
  )
}

export default Login
