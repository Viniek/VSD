import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleEmergency = () => {
    navigate("/Emergencies");
  };

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    oxygenSaturation: "",
    ejectionFraction: "",
    weight: "",
    cholesterol: "",
    height: "",
    heartRate: "",
    cyanosis: "",
    murmur: "",
    systolic: "",
    diastolic: "",
    vsdSize: "",
    familyHistory: "",
    xrayImage: null,
    cloudinaryUrl: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const convertedValue = ["cyanosis", "murmur", "familyHistory", "cholesterol", "vsdSize"].includes(name) ?
      value === "Yes" ? 1 : 0 : value;
    setFormData({ ...formData, [name]: convertedValue });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, xrayImage: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="home">
      <div className="home-section">
        <div className="home-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-group1">
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label>Oxygen Saturation (%)</label>
                <input type="number" name="oxygenSaturation" value={formData.oxygenSaturation} onChange={handleChange} required />

                <label>Ejection Fraction (%)</label>
                <input type="number" name="ejectionFraction" value={formData.ejectionFraction} onChange={handleChange} required />
              </div>

              <div className="form-group2">
                <label>Heart Rate (Bpm)</label>
                <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required />

                <label>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />

                <label>Upload X-ray Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />

                <label>Or Paste Cloudinary URL</label>
                <input type="text" name="cloudinaryUrl" value={formData.cloudinaryUrl} onChange={handleChange} />
              </div>
            </div>

            <div className="home-form-inputs-button">
              <button type="submit">Run Test</button>
            </div>
          </form>
        </div>

        <div className="result-area">
          <h2>Results will appear here</h2>
          {result && (
            <div className="results">
              <p><strong>Status:</strong> {result.vsd_status}</p>
              <p><strong>Severity:</strong> {result.severity}</p>
              <p><strong>Condition:</strong> {result.condition}</p>
              <p><strong>Treatment Recommendation:</strong> {result.treatment}</p>
            </div>
          )}
        </div>
      </div>

      <div className="action-btns">
        <button className="clear">Clear</button>
        <button className="save">Save</button>
        <button className="emergency" type="button" onClick={handleEmergency}>Call Emergency</button>
      </div>
    </div>
  );
};

export default Home;
