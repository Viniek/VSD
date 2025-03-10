import React from "react";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";  // Assuming this is the correct path
import "./ScheduleDashboard.css";


function ScheduleDashboard() {
  // UseUserStore to get user data


  return (
    <>
      <section className="schedulePage">
        <div className="ScheduleDashboard">My Appointments</div>

      </section>
    </>
  );
}

export default ScheduleDashboard;
