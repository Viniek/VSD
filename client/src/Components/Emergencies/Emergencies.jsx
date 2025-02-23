import { useState, useEffect } from "react";
import axios from "axios";
import './Emergencies.css'
const EmergencyReport = () => {
  const [description, setDescription] = useState("");
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        console.log("response",response);
        
        setIp(response.data.ip);
      } catch (err) {
        console.error("Error fetching IP:", err);
      }
    };
    fetchIP();
  }, []);

  const fetchLocation = async () => {
    if (!ip) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.ip2location.io/?key=83B064D9FBC656624A3768D6096CA035&ip=${ip}&format=json`
      );
      setLocation(response.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching location:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emergency-section">
      
<form action="">
<h2 className="">Report an Emergency</h2>
<div className="emergency-input-wrapper">
  <label htmlFor="">Name</label>
  <input type="text" placeholder="enter your name" />
</div>
<div className="emergency-input-wrapper">
  <label htmlFor="">Select Gender</label>
  <select name="gender" id="">
  <option value="select">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
  </select>

</div>
<div className="emergency-input-wrapper">
  <label htmlFor="">Describe your emergency</label>
<textarea
        className=""
        placeholder="Describe your emergency..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
</div>
<div className="emergency-input-wrapper">
<button
        className=""
        onClick={fetchLocation}
        disabled={loading }
      >
        {loading ? "Fetching location..." : "Submit Emergency"}
      </button>
</div>

</form>

<div className="location-wrapper">
  {loading?<p>we are tracking your location</p>:<p>Your location will apper here</p>}
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
