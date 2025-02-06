import React from 'react'
import  { Link } from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <header className='app-header'>
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