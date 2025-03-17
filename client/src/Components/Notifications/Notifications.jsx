import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { api_url } from "../../../utills/config";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast, { toastConfig } from "react-simple-toasts";

function Notifications() {
  const [notifications, setNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notificationsAvailable,setNotificationsAvailable]=useState(null)
  const [deletedNotificationId,setDeletedNotificationId]= useState(null)
  const [read, setRead] = useState(null);
const [deleting,setDeleting]=useState(false)


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
  handleGetNotification()
  
       
  }, []);

  async function handleDeleteNotification(id){
    setDeleting(true)
    try {
    const response = await axios.delete(`${api_url}api/notifications/deleteNotification/${id}`,{withCredentials:true})
    if(response.data.success ===true) 
      toast(`${response.data.message}🍞`, { theme: "success" });
      setNotifications(notifications.filter((notification)=>notification.id ==!id))
       
    } catch (error) {
      setError(response.data.message)
    }finally{
      setDeletedNotificationId(null)
      setDeleting(false)
    }
    }
   async function handleClearNotifications(){
    try {
      const response = await axios.delete(`${api_url}api/notifications/deleteAllNotifications`,{withCredentials:true})
      
      toast(`${response.data.message}🍞`, { theme: "success" });
      
    } catch (error) {
      setError(response.data.message)
      console.log(error.message);
      
    }
   }
  // console.log(read, "read status");

  return (
    <div className="notification-page">

        <h1>Notifications</h1>
      
      
      <section className={notifications? "notification-section":"no-notification-sectio"}>
        {notifications ? (
          notifications.map((notification) => (
            <table key={notification.id} className={notification?"table":"noTable"}>
              <tbody>
                <tr>
                  <td>{notification.message}</td>
                  <td>
                    <h2 className={read?"read":"unread"}>{read? "mark as unread":"mark as read"}</h2>
                  </td>
                  <td>
                    <h2 className="delete-button" onClick={() => handleDeleteNotification(notification.id)}>{deleting? "Deleting":"delete"}</h2>
                  </td>
                  <td className="view-details-button"><h2>View Details</h2></td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <h1 className="no-notification"> You have No notification 🔔</h1>
        )}
      </section>
      <button className={notifications?"clear_notification-btn":"no-clear_notification-btn"} onClick={handleClearNotifications}>Clear notifications</button>
      {error && <p className="errors">{error}</p>}
    </div>
  );
}

export default Notifications;
