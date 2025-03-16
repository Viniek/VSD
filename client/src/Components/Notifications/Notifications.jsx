import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { api_url } from "../../../utills/config";
import axios from 'axios'
import Loader from "../Loader/Loader";
function Notifications() {
  const [notifications,setNotifications] =useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]= useState(null)

  async function handleGetNotification(){
    try {
      setLoading(true)
      const response = await axios.get(`${api_url}api/notifications/getNotifications`,{withCredentials:true})
      if(response.data.success===true){
        setNotifications(response.data.data)
      }
      console.log(response.data);
      
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
   handleGetNotification() 
  },[])
  return (
    <div className="notification-page">
      {loading? <Loader loading={loading} type="Oval" color="blue"  size={80}/>:<h1>Notifications</h1>}
      {error && <p className="errors">{error}</p>}
      <section>
{notifications && notifications.map((notification)=><div key={notification.id}>
<p>{notification.message}</p>
</div>)}
      </section>
      
      </div>
  );
}

export default Notifications;