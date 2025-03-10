import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";  // Assuming this is the correct path
import "./ScheduleDashboard.css";
import axios from "axios";
import { api_url } from "../../../utills/config";
import "./ScheduleDashboard.css"

function ScheduleDashboard() {
 const [loading,setLoading]=useState(false);
 const[appointment,setAppointment]=useState([]);

 const handleGetAppointments= async()=>{
  setLoading(true);
  try{
    const res = await axios.get(`${api_url}api/appointment/viewAppointment`,{withCredentials:true});
  if(res.data.success){
    setAppointment(res.data.data);
    console.log(JSON.stringify(res.data.data));
  }
  }catch(error){
    console.log(error.message);
  }finally{
    setLoading(false);
  }
 }
useEffect(()=>{
  handleGetAppointments();
}, []);

  return (
    <>
      <section className="schedulePage">
        <h1>View Appointments</h1>
        {loading ? (
          <p>Loading...</p>
        ):appointment.length>0 ?(
          <ul>
            {appointment.map((item)=>(
              <li key={item.id}>
                <p><strong>User:</strong>{item.userid}</p>
                <p><strong>Hospital:</strong>{JSON.stringify(item.hospital,null,2)}</p>
                <p><strong>Date:</strong>{JSON.stringify(item.date,null,2)}</p>
              </li>
            ))}
          </ul>
        ):(
          <p>No appointments found.</p>
        )
      }
        {/* <div className="ScheduleDashboard">My Appointments</div> */}

      </section>
    </>
  );
}

export default ScheduleDashboard;