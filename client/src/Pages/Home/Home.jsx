import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    oxygenSaturation: '',
    ejectionFraction: '',
    weight: '',
    cholesterol: '',
    height: '',
    heartRate: '',
    cyanosis: '',
    murmur: '',
    systolic: '',
    diastolic: '',
    vsdSize: '',
    familyHistory: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="home">
      <h1 className="home-heading">Ventricular Septal Defect Analysis System</h1>
      <div className="home-section">
        <div className="home-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              {/* Left Side Inputs */}
              <div className="form-group">
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

                <label>Weight (Kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

                <label>Cholesterol (0-1)</label>
                <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required />

                <label>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />
              </div>

              {/* Right Side Inputs */}
              <div className="form-group">
                <label>Heart Rate (Bpm)</label>
                <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required />

                <label>Cyanosis (0-1)</label>
                <input type="number" name="cyanosis" value={formData.cyanosis} onChange={handleChange} required />

                <label>Murmur (0-1)</label>
                <input type="number" name="murmur" value={formData.murmur} onChange={handleChange} required />

                <label>Systolic (mmHg)</label>
                <input type="number" name="systolic" value={formData.systolic} onChange={handleChange} required />

                <label>Diastolic (mmHg)</label>
                <input type="number" name="diastolic" value={formData.diastolic} onChange={handleChange} required />

                <label>VSD Size (0-1)</label>
                <input type="number" name="vsdSize" value={formData.vsdSize} onChange={handleChange} required />

                <label>Family History (0-1)</label>
                <input type="number" name="familyHistory" value={formData.familyHistory} onChange={handleChange} required />
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
        <button className="emergency">Call Emergency</button>
      </div>
    </div>
  );
};

export default Home;
