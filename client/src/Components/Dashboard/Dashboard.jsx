import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
function Dashboard() {
  return (
<div className="dashboard">
<ul>
      <li><Link to={"/Home"}>History</Link></li>
      <li><Link to={"/Home"}>Notifications</Link></li>
      <li><Link to={"/Home"}>Emergencies</Link></li>
      <li><Link to={"/Home"}>Health centers</Link></li>
      <li><Link to={"/Home"}>help</Link></li>
      <li><Link to={"/Home"}>statistics</Link></li>
      <li><Link to={"/Home"}>Schedules</Link></li>
      <li><Link to={"/Home"}>Manage Account</Link></li>
      <li><Link to={"/Home"}>About</Link></li>
      <li><Link to={"/Home"}>dark mode</Link></li>
    </ul>
</div>
  )
}

export default Dashboard