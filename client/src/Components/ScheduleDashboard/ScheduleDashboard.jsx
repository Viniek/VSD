import React from "react";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";  // Assuming this is the correct path
import "./ScheduleDashboard.css";

// Hospitals array (already provided)
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
  "Bondo Sub County Hospital",
  "Kakamega Teaching and Referral Hospital",
  "Kajiado District Hospital",
  "Kangundo District Hospital",
  "Kapenguria District Hospital",
  "Karatina Level 4 Hospital",
  "Kendu Bay District Hospital",
  "Kibwezi District Hospital",
  "Kilifi County Referral Hospital",
  "Kimilili District Hospital",
  "Kisumu West District Hospital",
  "Kitui Teaching and Referral Hospital",
  "Kware Mission Hospital",
  "Lodwar Referral Hospital",
  "Lukenya District Hospital",
  "Machakos Medical Centre",
  "Makueni County Referral Hospital",
  "Maringo Level 5 Hospital",
  "Marsabit Medical Centre",
  "Mfangano Island Health Centre",
  "Migori Referral Hospital",
  "Mombasa Health Centre",
  "Nambale Sub County Hospital",
  "Narok Referral Hospital",
  "Ndiwa Sub County Hospital",
  "Ngeria Sub County Hospital",
  "Nzoia Sub County Hospital",
  "Othaya District Hospital",
  "Rabai Sub County Hospital",
  "Rachier Sub County Hospital",
  "Samburu Referral Hospital",
  "Siaya County Referral Hospital",
  "Suba District Hospital",
  "Sunda Sub County Hospital",
  "Taita District Hospital",
  "Tana River Referral Hospital",
  "Taveta District Hospital",
  "Tharaka Nithi County Referral Hospital",
  "Ugenya Sub County Hospital",
  "Uthiru Sub County Hospital",
  "Wajir Referral Hospital",
  "Wajir West Sub County Hospital",
  "Wamba Sub County Hospital",
  "Webuye County Referral Hospital",
  "Wundanyi Sub County Hospital",
  "Yatta Sub County Hospital",
  "Ziwa Sub County Hospital",
];

function ScheduleDashboard() {
  // UseUserStore to get user data
  const user = useUserStore((state) => state.user);
  console.log(user);

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
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  return (
    <>
      <section className="schedulePage">
        <div className="ScheduleDashboard">My Appointments</div>

        <div className="bookAppointmentForm">
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
                <div className="error">{formik.errors.hospital}</div>
              )}
            </div>

            <div className="dateOfAppointment">
              <label>Date of Appointment:</label>
              <input
                type="date"
                name="dateOfAppointment"
                value={formik.values.dateOfAppointment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfAppointment && formik.errors.dateOfAppointment && (
                <div className="error">{formik.errors.dateOfAppointment}</div>
              )}
            </div>

            <div className="bookAppointmentInput">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ScheduleDashboard;
