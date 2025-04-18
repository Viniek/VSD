import React from "react";
import { useState, useEffect } from "react";
import "../Globals.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import useUserStore from "../Store/userStore";
import About from "./Components/About/About";
import Schedules from "./Pages/Schedules/Schedules";
import Help from "./Components/Help/Help";
import HealthCenters from "./Components/HealthCenters/HealthCenters";
import Emergencies from "./Components/Emergencies/Emergencies";
import Notifications from "./Components/Notifications/Notifications";
import History from "./Components/History/History";
import Dashboard from "./Components/Dashboard/Dashboard";
import ScheduleDashboard from "./Components/ScheduleDashboard/ScheduleDashboard";
import Protected from "./Components/Protected/Protected";

function App() {
  
  const user = useUserStore((state) => state.user);
  const [isUser, setisUser] = useState(false);

  useEffect(() => {
    if (user) {
      setisUser(true);
    } else setisUser(false), (<Navigate to="/" />);
  }, [user]);

  return (
    <BrowserRouter>
      {isUser && <Header />}
      {isUser && (
        <Protected>
          <Dashboard />
        </Protected>
      )}

      <Routes>
        <>
          <Route path="/" element={<Login />} />
        </>
        <Route
          path="/Home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />

        <Route
          path="/Profile/:userid"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/About"
          element={
            <Protected>
              <About />
            </Protected>
          }
        />
        <Route
          path="/Schedules"
          element={
            <Protected>
              <Schedules />
            </Protected>
          }
        />

        <Route
          path="/Help"
          element={
            <Protected>
              <Help />
            </Protected>
          }
        />
        <Route
          path="/HealthCenters"
          element={
            <Protected>
              <HealthCenters />
            </Protected>
          }
        />
        <Route
          path="/Emergencies"
          element={
            <Protected>
              <Emergencies />
            </Protected>
          }
        />
        <Route
          path="Notifications/"
          element={
            <Protected>
              <Notifications />
            </Protected>
          }
        />
        <Route
          path="/History"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />

        <Route path="/ScheduleDashboard" element={<ScheduleDashboard />} />
        <Route
          path="/ScheduleDashboard"
          element={
            <Protected>
              <ScheduleDashboard />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
