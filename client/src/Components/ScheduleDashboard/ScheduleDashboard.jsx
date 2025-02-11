import React from 'react'
import './ScheduleDashboard.css'
import { Link} from 'react-router-dom'
function ScheduleDashboard() {
  return (
    <div className='ScheduleDashboard'>\
        <ul>
            <li><Link to={"/"}>My schedules</Link></li>
            <li><Link to={"/"}>Book appointment</Link></li>

        </ul>
    </div>
  )
}

export default ScheduleDashboard