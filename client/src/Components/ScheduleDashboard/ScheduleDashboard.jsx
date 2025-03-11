import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../utills/config";
import "./ScheduleDashboard.css";
import hospital from "./../../assets/hospital.jpeg";

function ScheduleDashboard() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editData, setEditData] = useState({ hospital: "", date: "" });

  useEffect(() => {
    handleGetAppointments();
  }, []);

  // Fetch Appointments
  const handleGetAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api_url}api/appointment/viewAppointment`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Explore Click
  const handleExplore = (appointment) => {
    setSelectedAppointment(appointment);
    setEditData({ hospital: appointment.hospital, date: appointment.date });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle Edit and Save
  const handleEditAppointment = async () => {
    if (!selectedAppointment) return;
    setLoading(true);
    try {
      const res = await axios.patch(
        `${api_url}api/appointment/editAppointment/${selectedAppointment.id}`,
        editData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSelectedAppointment(null); // Close floating card
        handleGetAppointments(); // Refresh list
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="schedulePage">
      <h1>View Appointments</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : appointments.length > 0 ? (
        <div className="appointment-container">
          {appointments.map((item) => (
            <div key={item.id} className="appointment-card">
              <div className="appointment-info">
                <p>
                  <strong>Hospital:</strong> {item.hospital}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <div className="appointment-image">
                  <img src={hospital} alt="Hospital" />
                </div>
                <button className="appointmentUpdateBtn" onClick={() => handleExplore(item)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}

      {/* Floating Card for Editing */}
      {selectedAppointment && (
        <div className="floating-card">
          <h2>Edit Appointment</h2>
          <label>Hospital:</label>
          <input
            type="text"
            name="hospital"
            value={editData.hospital}
            onChange={handleChange}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleChange}
          />

          <button className="save-btn" onClick={handleEditAppointment}>
            Save Changes
          </button>
          <button className="close-btn" onClick={() => setSelectedAppointment(null)}>
            Close
          </button>
        </div>
      )}
    </section>
  );
}

export default ScheduleDashboard;
