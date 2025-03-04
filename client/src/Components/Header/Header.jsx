import React from "react";
import { Link, Navigate } from "react-router-dom";
import useUserStore from "../../../Store/userStore";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaHospitalSymbol } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { BiSolidAmbulance } from "react-icons/bi";
import { FaHeartbeat } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { useEffect } from "react";

function Header(icon) {
  const changeUserInformation = useUserStore(
    (state) => state.changeUserInformation,
  );
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUserInformation);
  const user = useUserStore((state) => state.user);

  useEffect(() => {});

  function handleChangeTheme() {
    const settings = document.getElementById("home");
    const labelss = document.getElementById("label");

    labelss.classList.toggle("light");

    settings.classList.toggle("dark");
  }

  const handleLogout = () => {
    changeUserInformation(null);
    clearUser();
    navigate("/");
  };

  // const isLoginPage = location.pathname === "/Login";

  function handleToggleNav() {
    const navigationIcon = document.getElementById("nav");
    navigationIcon.classList.toggle("open");
  }
  return (
    <header className="app-header">
      <h3>
        ventricular Septal <span className="span">Defect</span> Analysis System
      </h3>
      <p>Welcome back {user && user.firstname}</p>

      <nav>
        <ul className="nav-list">
          <li>
            <Link to={"/Home"}>Home</Link>
          </li>
          <li>
            <Link to={"/Records"}>My Records</Link>
          </li>
          {user && (
            <li>
              <Link to={`/Profile/${user.id}`}>my account</Link>
            </li>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </nav>

      <div id="nav-icon">
        <p onClick={handleToggleNav}>
          <IoIosStats />
        </p>
        <nav id="nav" className="close">
          <ol className="nav-list1">
            <div className="actionss">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <FaCircleUser />
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Records"}>My Records</Link>
              </li>
              <FaCircleUser />
            </div>
            <div className="actionss">
              {" "}
              <li>
                <Link to={"/Profile"}>My Account</Link>
              </li>
              <FaCircleUser />
            </div>
            <div className="actionss">
              <li>
                <Link to={"/History"}>History</Link>
              </li>
              <GoHistory />
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Notifications"}>Notifications</Link>
              </li>{" "}
              <GoHistory />{" "}
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Emergencies"}>Emergencies</Link>
              </li>{" "}
              <BiSolidAmbulance />{" "}
            </div>
            <div className="actionss">
              <li>
                <Link to={"/HealthCenters"}>Health centers</Link>
              </li>{" "}
              <FaHospitalSymbol />{" "}
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Help"}>help</Link>
              </li>{" "}
              <GoHistory />{" "}
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Statistics"}>statistics</Link>
              </li>{" "}
              <GoHistory />{" "}
            </div>
            <div className="actionss">
              <li>
                <Link to={"/Schedules"}>Schedules</Link>
              </li>{" "}
              <FaHeartbeat />{" "}
            </div>
            {user && (
              <div className="actionss">
                <li>
                  <Link to={`/Profile/:${user.id}`}>Manage Account</Link>
                </li>{" "}
                <FaCircleUser />{" "}
              </div>
            )}
            <div className="actionss">
              <li>
                <Link to={"/About"}>About</Link>
              </li>{" "}
              <GoHistory />{" "}
            </div>
            <div id="homee" className="actionss">
              <li>
                <button onClick={handleChangeTheme}>
                  mode <GoHistory />
                </button>
              </li>
            </div>
            <div>
              <li>
                <button onClick={handleLogout} className="logout-btnn">
                  Logout{" "}
                </button>
              </li>
            </div>
          </ol>
        </nav>
      </div>
    </header>
  );
}

export default Header;
