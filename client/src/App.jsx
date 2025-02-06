import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Records from './Pages/Records/Records';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Records" element={<Records />} />
  <Route path="/Profile" element={<Profile />} />
  </Routes>
  </BrowserRouter>  
  )
}

export default App