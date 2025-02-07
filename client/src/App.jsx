import React, { Children }  from 'react'
import { useState, useEffect } from 'react';
import '../Globals.css'
import { BrowserRouter, Routes, Route,Navigate, useNavigate } from "react-router-dom";
import Header from './Components/Header/Header';
import Records from './Pages/Records/Records';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import useUserStore from '../Store/userStore';
import About from './Components/About/About';
import Schedules from './Components/Schedules/Schedules';
import Statistics from './Components/Statistics/Statistics';
import Help from './Components/Help/Help';
import HealthCenters from './Components/HealthCenters/HealthCenters';
import Emergencies from './Components/Emergencies/Emergencies';
import Notifications from './Components/Notifications/Notifications';
import History from './Components/History/History';
import Dashboard from './Components/Dashboard/dashboard';

function App() {
  const user = useUserStore((state)=>state.user)
  const [isUser,setisUser]= useState(false)

useEffect(()=>{
  if(user){setisUser(true)}
},[user])

  return (
  <BrowserRouter>
  {isUser && <Header/>}
  {isUser && <Dashboard/> }
  
  <Routes>

 <>
 
 <Route path="/Home" element={<Home />} />
 <Route path="/Records" element={<Records />} />
 <Route path="/Profile" element={<Profile />} />
 <Route path="/Signup" element={<Signup/>} />
 <Route path="/" element={<Login />} />
 <Route path="/About" element={<About />} />
 <Route path="/Schedules" element={<Schedules />} />
 <Route path="/Statistics" element={<Statistics />} />
 <Route path="/Help" element={<Help />} />
 <Route path="/HealthCenters" element={<HealthCenters/>} />
 <Route path="/Emergencies" element={<Emergencies />} />
 <Route path="Notifications/" element={<Notifications />} />
 <Route path="/History" element={<History />} />
 </>


  </Routes>
  </BrowserRouter>  
  )



}

export default App