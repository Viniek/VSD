import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { api_url } from "../../../utills/config";
import axios from "axios";
import Loader from "../Loader/Loader";
function Notifications() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [read, setRead] = useState(true);

  async function handleGetNotification() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api_url}api/notifications/getNotifications`,
        { withCredentials: true },
      );

      if (response.data.success === true) {
        setNotifications(response.data.data);

        if(response.data.data.read ===true)setRead(true)
          
      }
      
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      // setRead(null)
      setLoading(false);
      setError(null);
    }
  }
  useEffect(() => {
    handleGetNotification();
  }, []);
  console.log(read, "jhyvytfyg");

  return (
    <div className="notification-page">
      {loading ? (
        <Loader loading={loading} type="Oval" color="blue" size={80} />
      ) : (
        <h1>Notifications</h1>
      )}
      {error && <p className="errors">{error}</p>}
      <section className="notification-section">
        {notifications ? (
          notifications.map((notification) => (
            <table key={notification.id}>
              <tbody>
                <tr>
                  <td>{notification.message}</td>
                  <td>
                    <button className={read?"read":"unread"}>{read? "mark as unread":"mark as read"}</button>
                  </td>
                  <td>
                    <button className="delete-button">Delete</button>
                  </td>
                  {/* <td>{notification.read}</td> */}
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <h1 className="no-notification"> You have No notification 🔔</h1>
        )}
      </section>
    </div>
  );
}

export default Notifications;
