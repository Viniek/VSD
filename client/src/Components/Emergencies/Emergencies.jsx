import { useState } from "react";
import { useFormik } from "formik";
import "./Emergencies.css";
import useUserStore from "../../../Store/userStore";
import axios from "axios";
import Loader from "../Loader/Loader";
import { api_url } from "../../../utills/config";
import useNotificationStore from "../../../Store/notificationsStore";

const EmergencyReport = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const incrementNotificationCount = useNotificationStore(
    (state) => state.incrementNotification,
  );
  const user = useUserStore((state) => state.user);

  const fetchLocation = async (values) => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          // Fetch human-readable address using Nominatim API
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          setAddress(response.data.display_name);
          incrementNotificationCount()
          const notificationData = {
            message: "your emergency submission was succesful",
            details: `Your Location was${address},and your emergency was ${formik.values.description}`,
          };
          await axios.post(
            `${api_url}api/notifications/createNotification`,
            notificationData,
            { withCredentials: true },
          );
          
        } catch (error) {
          setError("Failed to get location details.");
        }

        setLoading(false);
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      },
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      description: "",
    },
    onSubmit: (values) => {
      fetchLocation(values); // Get accurate user location
    },
    validate: function (values) {
      const errors = {};
      if (!values.name) errors.name = "Your name is required";
      if (!values.gender) errors.gender = "Gender is required";
      if (!values.description)
        errors.description = "Description of your emergency is required";
      return errors;
    },
  });

  return (
    <div className="emergency-section">
      <form onSubmit={formik.handleSubmit}>
        <h2>Report an Emergency ⚠️</h2>

        <div className="emergency-input-wrapper">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
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
          <label>Select Gender</label>
          <select
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="errors">{formik.errors.gender}</p>
          )}
        </div>

        <div className="emergency-input-wrapper">
          <label>Describe your emergency</label>
          <textarea
            name="description"
            placeholder="Describe your emergency..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className="errors">{formik.errors.description}</p>
          )}
        </div>

        <div className="emergency-input-wrapper">
          <button type="submit" disabled={loading}>
            {loading ? "Tracking Location..." : "Submit Emergency"}
          </button>
        </div>
      </form>

      <div className="location-wrapper">
        {loading ? (
          <p className="location-status">Tracking your location...</p>
        ) : (
          <p className="location-status">
            Your location will be tracked and sent to our emergency team.
          </p>
        )}

        {loading && (
          <Loader loading={loading} type="Oval" color="green" size={50} />
        )}
        {error && <p className="errors">{error}</p>}

        {location && (
          <div className="location-container">
            <div className="personal-details">
              <h3>Personal Details:</h3>
              <p>
                <strong>Name: </strong> {formik.values.name}
              </p>
              <p>
                <strong>Gender: </strong>
                {formik.values.gender}
              </p>
              <p>
                <strong>Your Emergency: </strong>
                {formik.values.description}
              </p>
            </div>
            <div className="location-details">
              <h3>Location Details: 📍</h3>
              <p>
                <strong>Latitude:</strong> {location.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {location.longitude}
              </p>
              {address && (
                <p>
                  <strong>Exact Location:</strong> {address}
                </p>
              )}
            </div>
            <h4 style={{ marginTop: "2rem", color: "grey" }}>
              {" "}
              Your emergency was sent to our emergency team ✅
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyReport;
