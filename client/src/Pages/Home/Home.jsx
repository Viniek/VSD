import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    heartRate: "",
    bloodPressure: "",
    cholesterol: "",
    oxygenLevel: "",
    imageFile: null,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    console.log("📤 Sending Data:", Object.fromEntries(data.entries()));

    try {
      const response = await axios.post("http://localhost:5000/predict", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.error : "Server error");
    }
  };

  return (
    <div className="container">
      <h1>VSD Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Heart Rate:
          <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required />
        </label>
        <label>
          Blood Pressure:
          <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required />
        </label>
        <label>
          Cholesterol:
          <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required />
        </label>
        <label>
          Oxygen Level:
          <input type="number" name="oxygenLevel" value={formData.oxygenLevel} onChange={handleChange} required />
        </label>
        <label>
          Upload X-ray Image:
          <input type="file" name="imageFile" accept="image/*" onChange={handleChange} required />
        </label>
        <button type="submit">Predict</button>
      </form>

      {error && <p className="error">Error: {error}</p>}

      {result && (
        <div className="result">
          <h2>Prediction Result</h2>
          <p><strong>Condition:</strong> {result.condition}</p>
          <p><strong>Status:</strong> {result.vsd_status}</p>
          <p><strong>Severity:</strong> {result.severity}</p>
          <p><strong>Treatment:</strong> {result.treatment}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
