import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { api_url } from "../../../utills/config";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast, { toastConfig } from "react-simple-toasts";

function Notifications() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedNotificationId,setDeletedNotificationId]= useState(null)
  const [read, setRead] = useState(null);


  async function handleGetNotification() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api_url}api/notifications/getNotifications`,
        { withCredentials: true },
      );

      if (response.data.success === true) {
        setNotifications(response.data.data);
        // toast(`${response.data.message}🍞`, { theme: "success" });
        setRead(response.data.data.read)
          
          
      }
      
    } catch (error) {
      console.log(error.message);
      setError(response.data.message || "there was an error getting notifications");
    } finally {
      // setRead(null)
      setLoading(false);
      setError(null);
    }
  }
  useEffect(() => {
  
    let timer = setTimeout(() => {
handleGetNotification()
    }, 100);
  
    return () => clearTimeout(timer)
      // handleGetNotification()
      
  }, [notifications]);

  async function handleDeleteNotification(id){
    try {
    const response = await axios.delete(`${api_url}api/notifications/deleteNotification/${id}`,{withCredentials:true})
    if(response.data.success ===true) 
      toast(`${response.data.message}🍞`, { theme: "success" });
      setNotifications(notifications.filter((notification)=>notification.id ==!id))
    // console.log(response.data);
    
    } catch (error) {
      setError(response.data.message)
    }finally{
      setDeletedNotificationId(null)
    }
    }
   
  // console.log(read, "read status");

  return (
    <div className="notification-page">

        <h1>Notifications</h1>
      
      
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
                    <button className="delete-button" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
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
      {error && <p className="errors">{error}</p>}
    </div>
  );
}

export default Notifications;
