import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";
import Loader from "../../Components/Loader/Loader";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { api_url } from "../../../utills/config";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeUserInformation = useUserStore(
    (state) => state.changeUserInformation,
  );
  async function handleSubmit(values) {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${api_url}api/users/Login`, values, {
        withCredentials: true,
      });
      // console.log("response",response);
      const data = response.data;
      // console.log("data",data.success);

      navigate("/Home");
      changeUserInformation(data.data);
    } catch (error) {
      // console.log("err",error);

      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validate: function (values) {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Please enter a password";
      return errors;
    },
  });

  return (
    <div className="login-section">
      <h1>Login to your Account</h1>

      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <h2>
            <FaCircleUser />
          </h2>
          <div className="login-inputs">
            <label>Email</label>
            <input
              type="text"
              placeholder="enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="errors">{formik.errors.email}</p>
            )}
          </div>

          <div className="login-inputs">
            <label> Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="errors">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading}>
          {loading ? <Loader loading={loading} type="ThreeDots" color="blue" size={80} /> : "Login"}
          </button>
          {error && <p className="errors"> {error}</p>}
        </form>
      </div>
      <div className="navigate">
        <p>Have no account?</p>
        <Link to="/Signup">Create Account</Link>
      </div>
    </div>
  );
}

export default Login;
