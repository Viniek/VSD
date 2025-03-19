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
  });

  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const convertedValue = [
      "cyanosis",
      "murmur",
      "familyHistory",
      "cholesterol",
      "vsdSize",
    ].includes(name)
      ? value === "Yes"
        ? 1
        : 0
      : value;

    setFormData({ ...formData, [name]: convertedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="home">
      {/* <h1 className="home-heading">Ventricular Septal Defect Analysis System</h1> */}
      <div className="home-section">
        <div className="home-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-group1">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label>Oxygen Saturation (%)</label>
                <input
                  type="number"
                  name="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={handleChange}
                  required
                />

                <label>Ejection Fraction (%)</label>
                <input
                  type="number"
                  name="ejectionFraction"
                  value={formData.ejectionFraction}
                  onChange={handleChange}
                  required
                />

                <label>Weight (Kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />

                <label>Cholesterol</label>
                <select
                  name="cholesterol"
                  value={formData.cholesterol ? "Yes" : "No"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>

                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="">attach a photo</label>
                <input type="file" />
              </div>

              <div className="form-group2">
                <label>Heart Rate (Bpm)</label>
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  required
                />

                <label>Cyanosis</label>
                <select
                  name="cyanosis"
                  value={formData.cyanosis ? "Yes" : "No"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>

                <label>Murmur</label>
                <select
                  name="murmur"
                  value={formData.murmur ? "Yes" : "No"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>

                <label>Systolic (mmHg)</label>
                <input
                  type="number"
                  name="systolic"
                  value={formData.systolic}
                  onChange={handleChange}
                  required
                />

                <label>Diastolic (mmHg)</label>
                <input
                  type="number"
                  name="diastolic"
                  value={formData.diastolic}
                  onChange={handleChange}
                  required
                />

                <label>VSD Size</label>
                <select
                  name="vsdSize"
                  value={formData.vsdSize ? "Yes" : "No"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="No">Small</option>
                  <option value="Yes">Large</option>
                </select>

                <label>Family History</label>
                <select
                  name="familyHistory"
                  value={formData.familyHistory ? "Yes" : "No"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
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
              <p>
                <strong>Status:</strong> {result.vsd_status}
              </p>
              <p>
                <strong>Severity:</strong> {result.severity}
              </p>
              <p>
                <strong>Condition:</strong> {result.condition}
              </p>
              <p>
                <strong>Treatment Recommendation:</strong> {result.treatment}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="action-btns">
        <button className="clear">Clear</button>
        <button className="save">Save</button>
        <button className="emergency" type="button" onClick={handleEmergency}>
          Call Emergency
        </button>
      </div>
    </div>
  );
};

export default Home;