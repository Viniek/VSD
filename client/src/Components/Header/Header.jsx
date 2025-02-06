import React from 'react'
import  { Link } from 'react-router-dom'
import { FaHospitalSymbol } from "react-icons/fa";
import './Header.css'
function Header(icon) {

  function handleToggleNav(){
const navigationIcon = document.getElementById('nav')
navigationIcon.classList.toggle('open')
navigationIcon.classList.add("close")
// const openNav = document.getElementById("#nav")
// openNav.classList.toggle("close")



  }
  return (
    <header className='app-header'>
        <h3>Lorem ipsum dolor <span className='span'>sit amet</span></h3>
        <p>Welcome back Victory</p>
        
<nav>
        <ul className='nav-list'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/Records'}>My Records</Link></li>
        <li><Link to={'/Profile'}>Profile</Link></li>
        <li><Link to={'/'}>Logout</Link></li>
        </ul>
</nav>

<div id='nav-icon'>
<p onClick={handleToggleNav}><FaHospitalSymbol/></p>
<nav id='nav'>
        <ol className='nav-list'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/Records'}>My Records</Link></li>
        <li><Link to={'/Profile'}>Profile</Link></li>
        <li><Link to={'/'}>Logout</Link></li>
        </ol>
</nav>
</div>
    </header>
  )
}

export default Header