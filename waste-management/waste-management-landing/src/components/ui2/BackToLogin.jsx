import React from 'react'
import "./backToLogin.css"
import { HiOutlineLogin } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const BackToLogin = () => {
  const navigate=useNavigate()
  const navigateHandler=()=>{
    navigate('/login')
  }
  return (
    <div onClick={navigateHandler} className='back_toLogin_ui'>
      <HiOutlineLogin/>
      <span>
        Back to Login
      </span>
    </div>
  )
}

export default BackToLogin
