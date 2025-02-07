import React from 'react'
import  { Link, Navigate } from 'react-router-dom'
import { FaHospitalSymbol } from "react-icons/fa"; 
import useUserStore from '../../../Store/userStore';
import './Header.css'
import { useNavigate} from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import Login from '../../Pages/Login/Login';
import {useEffect } from 'react'
function Header(icon) {
  const changeUserInformation = useUserStore( (state) => state.changeUserInformation );
  const navigate = useNavigate()
  const clearUser = useUserStore((state)=>state.clearUserInformation)
  const user = useUserStore((state)=>state.user)



  const handleLogout = () => {
    changeUserInformation(null);
    clearUser(); 
    navigate("/");
  };

  const isLoginPage = location.pathname === "/Login";

  


   
  function handleToggleNav(){
const navigationIcon = document.getElementById('nav')
navigationIcon.classList.toggle('open')



console.log(labelss);

  }
  return (
    <header className='app-header'>
        <h3>ventricular Septal  <span className='span'>Defect</span> Analysis System</h3>
        <p>Welcome back { user && user.email}</p>
        
<nav>
        <ul className='nav-list'>
        <li><Link to={'/Home'}>Home</Link></li>
        <li><Link to={'/Records'}>My Records</Link></li>
        <li><Link to={'/Profile'}>my account</Link></li>
        <button  className='logout-btn' onClick={handleLogout}>Logout</button>
        
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