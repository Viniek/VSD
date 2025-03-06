import React from "react";
import { useState, useEffect } from "react";
import "../Globals.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Records from "./Pages/Records/Records";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import useUserStore from "../Store/userStore";
import About from "./Components/About/About";
import Schedules from "./Pages/Schedules/Schedules";
import Statistics from "./Components/Statistics/Statistics";
import Help from "./Components/Help/Help";
import HealthCenters from "./Components/HealthCenters/HealthCenters";
import Emergencies from "./Components/Emergencies/Emergencies";
import Notifications from "./Components/Notifications/Notifications";
import History from "./Components/History/History";
import Dashboard from "./Components/Dashboard/Dashboard";
import Protected from "./Components/Protected/Protected";
// use protected routes
function App() {
  // const navigate  = useNavigate()
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
          path="/Records"
          element={
            <Protected>
              <Records />
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
          path="/Statistics"
          element={
            <Protected>
              <Statistics />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
