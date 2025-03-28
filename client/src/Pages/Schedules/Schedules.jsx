import React, { useState } from "react";
import "./Schedules.css";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";
import axios from "axios";
import { api_url } from "../../../utills/config";
import toast, { toastConfig } from "react-simple-toasts";

import "./Schedules.css";
import ScheduleDashboard from "../../Components/ScheduleDashboard/ScheduleDashboard";
import useNotificationStore from "../../../Store/notificationsStore";
function Schedules() {
  const increaseNotification = useNotificationStore(
    (state) => state.incrementNotification,
  );
  const [loading, setLoading] = useState(false);
  const hospitals = [
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

  const user = useUserStore((state) => state.user);
  // console.log(user);

  // Formik initialization with validation
  const formik = useFormik({
    initialValues: {
      hospital: "",
      dateOfAppointment: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.hospital) {
        errors.hospital = "Hospital is required!";
      }
      if (!values.dateOfAppointment) {
        errors.dateOfAppointment = "Date is required!";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const details_section = document.getElementById("details-of-booking");
      // details_section.style.display = "block";
      try {
        setLoading(true);
        const data = {
          date: String(values.dateOfAppointment),
          hospital: values.hospital,
        };
        const res = await axios.post(
          `${api_url}api/appointment/bookAppointment`,
          data,
          { withCredentials: true },
        );

        if (res.data.success === true) {
          increaseNotification();
          await axios.get(`${api_url}api/appointment/viewAppointment`, {
            withCredentials: true,
          });
          formik.resetForm();
          toast(`Booking succesfull🍞`, { theme: "success" });
          const notificationData = {
            message: "you bokked an appointment",
            details: `..`,
          };

          await axios.post(
            `${api_url}api/notifications/createNotification`,
            notificationData,
            { withCredentials: true },
          );
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="schedule-section">
      <ScheduleDashboard />

      <div className="contentContainer">
        <div className="schedule-dashboard-container"></div>
      </div>

      <div className="book-Appointment-Form-section">
        <h1>Book An Appointment</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="bookAppointmentInput">
            <label>Hospital of Choice:</label>
            <select
              name="hospital"
              value={formik.values.hospital}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
            {formik.touched.hospital && formik.errors.hospital && (
              <div className="errors">{formik.errors.hospital}</div>
            )}
          </div>

          <div className="bookAppointmentInput">
            <label>Date of Appointment:</label>
            <input
              type="date"
              name="dateOfAppointment"
              value={formik.values.dateOfAppointment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfAppointment &&
              formik.errors.dateOfAppointment && (
                <div className="errors">{formik.errors.dateOfAppointment}</div>
              )}
          </div>

          <div className="bookAppointmentInput">
            <button type="submit" disabled={loading}>
              {loading ? "Booking appointment.." : "Book Appointment"}
            </button>
          </div>
          <div className="details-of-booking" id="details-of-booking">
            <h2>Booking Details</h2>
            <div className="details">
              <p>
                <strong>Name: </strong>
                {user && user.firstname}
              </p>
              <p>
                <strong>Sex: </strong>
                {user && user.gender}
              </p>
            </div>
            <div className="details">
              <p>
                <strong>Phone: </strong>
                {user && user.phone}
              </p>
              <p>
                <strong>Status: </strong>
                {user && user.maritual_status}
              </p>
            </div>
            <div className="details">
              <p>
                <strong>Hospital: </strong>
                {formik.values.hospital}
              </p>
              <p>
                <strong>Date Of Appointment: </strong>
                {formik.values.dateOfAppointment}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Schedules;
