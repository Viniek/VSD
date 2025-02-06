import React from 'react'
import  { Link } from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <header className='app-header'>
        <h3>Lorem ipsum dolor <span className='span'>sit amet</span>.</h3>
        <p>Welcome back Victory</p>
        \
<nav>
        <ul className='nav-list'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/'}>My Records</Link></li>
        <li><Link to={'/'}>Profile</Link></li>
        <li><Link to={'/'}>Logout</Link></li>
        </ul>
</nav>
    </header>
  )
}

export default Header