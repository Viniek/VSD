import React from 'react'
import  { Link } from 'react-router-dom'
import { FaHospitalSymbol } from "react-icons/fa"; 
import useUserStore from '../../../Store/userStore';
import './Header.css'
import { useNavigate} from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import {useEffect } from 'react'
function Header(icon) {
  const navigate = useNavigate()
  const clearuser = useUserStore((state)=>state.clearUserInformation)
  const user = useUserStore((state)=>state.user)

  function handleLogout(){
  navigate("/")
  clearuser()
  
}

   
  function handleToggleNav(){
const navigationIcon = document.getElementById('nav')
navigationIcon.classList.toggle('open')

  }
  return (
    <header className='app-header'>
        <h3>ventricular Septal  <span className='span'>Defect</span> Analysis System</h3>
        <p>Welcome back {user.email}</p>
        
<nav>
        <ul className='nav-list'>
        <li><Link to={'/Home'}>Home</Link></li>
        <li><Link to={'/Records'}>My Records</Link></li>
        <li><Link to={'/Profile'}>Profile</Link></li>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </ul>
</nav>

<div id='nav-icon'>
<p onClick={handleToggleNav}><FaHospitalSymbol/></p>
<nav id='nav' className='close'>
        <ol className='nav-list'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/Records'}>My Records</Link></li>
       <div className="actions"> <li><Link to={'/Profile'}>My Account</Link></li><FaCircleUser/></div>
        <li><Link to={'/'}>Logout</Link></li>
        </ol>
</nav>
</div>
    </header>
  )
}

export default Header