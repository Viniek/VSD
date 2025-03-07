import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FaHospitalSymbol } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { BiSolidAmbulance } from "react-icons/bi";
import { FaHeartbeat } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { FcStatistics } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import useUserStore from "../../../Store/userStore";

function Dashboard() {
  const user = useUserStore((state) => state.user);
  function handleChangeTheme() {
    const settings = document.getElementById("home");
    const labelss = document.getElementById("label");

    labelss.classList.toggle("light");

    settings.classList.toggle("dark");
  }
  return (
    <div className="dashboard">
      <ul>
        <div className="actions">
          <li>
            <Link to={"/History"}>History</Link>
          </li>
          <GoHistory className="icon" />
        </div>
        <div className="actions">
          <li>
            <Link to={"/Notifications"}>Notifications 🔔</Link>
          </li>{" "}
          <IoIosNotificationsOutline className="icon" />{" "}
        </div>
        <div className="actions">
          <li>
            <Link to={"/Emergencies"}>Emergencies</Link>
          </li>{" "}
          <BiSolidAmbulance className="icon" />{" "}
        </div>
        <div className="actions">
          <li>
            <Link to={"/HealthCenters"}>Health centers</Link>
          </li>{" "}
          <FaHospitalSymbol className="icon" />{" "}
        </div>
        <div className="actions">
          <li>
            <Link to={"/Help"}>help</Link>
          </li>{" "}
          <IoMdHelpCircle className="icon" />
        </div>
        <div className="actions">
          <li>
            <Link to={"/Statistics"}>statistics</Link>
          </li>{" "}
          <FcStatistics className="icon" />{" "}
        </div>
        <div className="actions">
          <li>
            <Link to={"/Schedules"}>Schedules</Link>
          </li>{" "}
          <FaHeartbeat className="icon" />{" "}
        </div>
        {user && (
          <div className="actions">
            <li>
              <Link to={`/Profile/${user.id}`}>Manage Account</Link>
            </li>{" "}
            <FaCircleUser className="icon" />{" "}
          </div>
        )}
        <div className="actions">
          <li>
            <Link to={"/About"}>About</Link>
          </li>{" "}
          <FcAbout />{" "}
        </div>
        <div id="h">
          <li>
            <button onClick={handleChangeTheme}>
              mode <GoHistory className="icon" />
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Dashboard;
