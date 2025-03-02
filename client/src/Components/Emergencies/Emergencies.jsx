import { useState, useEffect } from "react";
import axios from "axios";
import "./Emergencies.css";
import { useFormik } from "formik";
import useUserStore from "../../../Store/userStore";
import { api_key } from "../../../utills/config";
const EmergencyReport = () => {
  const [description, setDescription] = useState("");
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);

  // if(user){formik.setValues()}
  useEffect(() => {
    const fetchIP = async () => {
      try {
        // setLoading(true)
        const response = await axios.get("https://api64.ipify.org?format=json");
        console.log("response", response);

        setIp(response.data.ip);
      } catch (err) {
        console.error("Error fetching IP:", err);
        setError(err.message);
      }
    };
    fetchIP();
  }, []);

  const fetchLocation = async (values) => {
    console.log(formik.values);

    if (!ip) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.ip2location.io/?key=${api_key}&ip=${ip}&format=json`,
      );
      setLocation(response.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching location:", err);
    } finally {
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      description: "",
    },
    onSubmit: fetchLocation,
    validate: function (values) {
      const errors = {};
      if (values.name) errors.name = "your name is required";
      if (values.gender) errors.gender = "Gender is required";
      if (values.emergency)
        errors.emergency = "description of your emergency is required";
      return errors;
    },
  });

  return (
    <div className="emergency-section">
      <form action="" onSubmit={formik.handleSubmit}>
        <h2 className="">Report an Emergency</h2>
        <div className="emergency-input-wrapper">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <p className="errors">{formik.errors.name}</p>
          )}
        </div>
        <div className="emergency-input-wrapper">
          <label htmlFor="">Select Gender</label>
          <select
            name="gender"
            id=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="">select</option>
            <option value="select">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="emergency-input-wrapper">
          <label htmlFor="">Describe your emergency</label>
          <textarea
            className=""
            name="description"
            placeholder="Describe your emergency..."
            value={formik.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div className="emergency-input-wrapper">
          <button className="" type="submit" disabled={loading}>
            {loading ? "We are Fetching location..." : "Submit Emergency"}
          </button>
        </div>
      </form>

      <div className="location-wrapper">
        {loading ? (
          <p className="location-status">we are tracking your location</p>
        ) : (
          <p className="location-status">
            Your location will tracked and will be sent to our emergency team
          </p>
        )}
        {error && <p className="errors">{error}</p>}
        {location && (
          <div className="location-container">
            <h3 className="">Location Details:</h3>
            <p>Country: {location.country_name}</p>
            <p>Region: {location.region_name}</p>
            <p>City: {location.city_name}</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyReport;
