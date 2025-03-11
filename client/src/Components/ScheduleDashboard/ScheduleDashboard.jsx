import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../utills/config";
import "./ScheduleDashboard.css";
import hospital from './../../assets/hospital.jpeg'

function ScheduleDashboard() {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState([]);

  const handleGetAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${api_url}api/appointment/viewAppointment`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAppointments();
  }, []);

  return (
    <section className="schedulePage">
      <h1>View Appointments</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : appointment.length > 0 ? (
        <div className="appointment-container">
          {appointment.map((item) => (
            <div key={item.id} className="appointment-card">              
              <div className="appointment-info">
                {/* <h2>{item.userid}</h2> */}
                <p><strong>Hospital:</strong> {item.hospital}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <div className="appointment-image">
                  <img src={hospital} alt="Hospital"/>
                  </div> 
                <button className="explore-btn">Explore</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </section>
  );
}

export default ScheduleDashboard;
