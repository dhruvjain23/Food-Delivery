import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopup = ({ setShowLogin }) => {

  const {url, setToken}= useContext(StoreContext)

  const [currState, setCurrstate] = useState('Login')
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  })

  const onChangeHnadler = (event)=>{
    const name =event.target.name
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin = async(evnet)=>{
    evnet.preventDefault()
    let newUrl = url;
    if (currState==='Login') {
      newUrl += '/api/user/login'
    }
    else{
      newUrl += '/api/user/register'
    }


    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }


  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === 'Login' ? <></> : <input name='name' onChange={onChangeHnadler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHnadler} value={data.email} type="email" placeholder='E-mail' required />
          <input name='password' onChange={onChangeHnadler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === 'Sign up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
         <input type="checkbox" required />
          <p>By continuing, I agree to terms of use & Privacy Policy</p>
        </div>
        {
          currState === 'Login'
            ? <p>Create a new account? <span onClick={() => setCurrstate('Sign up')}>Click here</span></p>
            : <p>Already have an account? <span onClick={()=>setCurrstate('Login')}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
