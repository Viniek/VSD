import React  from 'react'
import { useState, useEffect } from 'react';
import '../Globals.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Records from './Pages/Records/Records';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import useUserStore from '../Store/userStore';
// import { useState } from 'react'
function App() {
  const user = useUserStore((state)=>state.user)
  const [isUser,setisUser]= useState(false)
  useEffect(()=>{
    if(user){setisUser(true)}
  },[user])
  return (
  <BrowserRouter>
  {isUser && <Header/>}
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/Home" element={<Home />} />
  <Route path="/Records" element={<Records />} />
  <Route path="/Profile" element={<Profile />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/Signup" element={<Signup/>} />
  </Routes>
  </BrowserRouter>  
  )
}

export default App