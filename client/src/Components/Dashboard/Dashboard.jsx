import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { FaHospitalSymbol } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { BiSolidAmbulance } from "react-icons/bi";
import { FaHeartbeat } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { FcStatistics } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { MdDarkMode } from "react-icons/md";

function Dashboard() {

  function handleChangeTheme (){
   const settings = document.getElementById("home")
   const labelss = document.getElementById("label")

labelss.classList.toggle("light")

settings.classList.toggle("dark")

  }
  return (
<div className="dashboard" >
<ul>
<div className='actions'><li><Link to={"/History"}>History</Link></li><GoHistory/></div>
      <div className="actions"><li><Link to={"/Notifications"}>Notifications</Link></li> <IoIosNotificationsOutline /> </div>
      <div className="actions"><li><Link to={"/Emergencies"}>Emergencies</Link></li> <BiSolidAmbulance/> </div>
      <div className="actions"><li><Link to={"/HealthCenters"}>Health centers</Link></li> <FaHospitalSymbol/> </div>
      <div className="actions"><li><Link to={"/Help"}>help</Link></li> <IoMdHelpCircle /></div>
      <div className="actions"><li><Link to={"/Statistics"}>statistics</Link></li> <FcStatistics /> </div>
      <div className="actions"><li><Link to={"/Schedules"}>Schedules</Link></li> <FaHeartbeat/> </div>
      <div className="actions"><li><Link to={"/Profile"}>Manage Account</Link></li> <FaCircleUser/> </div>
      <div className="actions"><li><Link to={"/About"}>About</Link></li> <FcAbout /> </div>
      <div id='h'><li ><button  onClick={handleChangeTheme}>mode <GoHistory/></button ></li></div>
    </ul>
</div>
  )
}

export default Dashboard;