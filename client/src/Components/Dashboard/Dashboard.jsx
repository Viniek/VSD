import React, { useState } from "react";
import "./Dashboard.css";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../../../Store/userStore";
import useNotificationStore from "../../../Store/notificationsStore";

function Dashboard() {
  const notificationCount = useNotificationStore((state)=>state.notificationsCount)
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleChangeTheme() {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark"); // Toggle dark mode on body
  }
// console.log(notificationCount);

  return (
    <div className="dashboard">
      <ul>
        {[
          { path: "/History", label: "📜 History" },
          { path: "/Notifications", label: `🔔(${notificationCount}) Notifications` },
          { path: "/Emergencies", label: "🚑 Emergencies" },
          { path: "/HealthCenters", label: "🏥 Health Centers" },
          { path: "/Help", label: "🆘 Help" },
          { path: "/Schedules", label: "📅 Schedules" },
          { path: "/About", label: "ℹ️ About" },
          user && { path: `/Profile/${user.id}`, label: "👤 Manage Account" },
        ]
          .filter(Boolean)
          .map((item) => (
            <div className="actions" key={item.path}>
              <li>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            </div>
          ))}

        {/* Switch Mode Button */}
        <div id="h">
          <li onClick={handleChangeTheme}>
            {isDarkMode ? "🌞 Light Mode" : "🌗 Dark Mode"}
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Dashboard;
