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
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    handleGetAppointments();
    fetchHospitals();
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

  // Fetch Hospital List
  const fetchHospitals = async () => {
    const hospitalList = [
      "Aga Khan University Hospital",
      "Nairobi Hospital",
      "Kenya National Hospital",
      "Kenya Medical Research Institute",
      "Kenyatta National Hospital",
      "MP Shah Hospital",
      "Coptic Hospital",
      "Mater Misericordiae Hospital",
      "Mombasa Hospital",
      "Nyanza Provincial Hospital",
      "Kisumu District Hospital",
      "Nakuru Provincial Hospital",
      "Eldoret Hospital",
      "Kabras Health Center",
      "Eldama Ravine Hospital",
      "Embu Level 5 Hospital",
      "Thika Level 5 Hospital",
      "Kitale District Hospital",
      "Kisii Teaching and Referral Hospital",
      "Kajiado Referral Hospital",
      "Mombasa County Referral Hospital",
      "Nakuru County Referral Hospital",
      "Machakos Level 5 Hospital",
      "Meru Teaching and Referral Hospital",
      "Bomet County Referral Hospital",
      "Bungoma County Referral Hospital",
      "Bomet District Hospital",
      "Chuka General Hospital",
      "County Referral Hospital",
      "Nyeri Provincial Hospital",
      "Vihiga District Hospital",
      "Isiolo Referral Hospital",
      "Kericho District Hospital",
      "Kirinyaga County Referral Hospital",
      "Kisumu City Hospital",
      "Lamu County Referral Hospital",
      "Lodwar Hospital",
      "Mandera County Referral Hospital",
      "Marsabit County Referral Hospital",
      "Nakuru Town Hospital",
      "Nyeri Teaching and Referral Hospital",
      "PCEA Kikuyu Hospital",
      "Pumwani Maternity Hospital",
      "Ruiru Level 5 Hospital",
      "St. Francis Community Hospital",
      "St. Joseph’s Mission Hospital",
      "St. Mary's Mission Hospital",
      "Thika District Hospital",
      "Voi District Hospital",
      "Webuye County Referral Hospital",
      "Wote District Hospital",
      "Zambezi Mission Hospital",
    ];
    setHospitals(hospitalList);
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
        { withCredentials: true },
      );
      if (res.data.success) {
        setSelectedAppointment(null);
        handleGetAppointments();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="schedulePage">
      <h1 className="appointment-title-heading">Your Appointments</h1>
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
                <div>
                  <button
                    className="appointmentUpdateBtn"
                    onClick={() => handleExplore(item)}
                  >
                    Edit
                  </button>

                  <button className="appointment-delete-btn">delete</button>
                </div>
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
          <select
            name="hospital"
            value={editData.hospital}
            onChange={handleChange}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>

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
          <button
            className="close-btn"
            onClick={() => setSelectedAppointment(null)}
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}

export default ScheduleDashboard;
