import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    oxygenSaturation: "",
    ejectionFraction: "",
    weight: "",
    cholesterol: "",
    vsdSize: "",
    height: "",
    heartRate: "",
    cyanosis: "",
    murmur: "",
    systolic: "",
    diastolic: "",
    familyHistory: "",
    imageUrl: "", // Store the image URL
    imageFile: null, // Store the uploaded file
  });

  const [previewImage, setPreviewImage] = useState(null); // To preview the image
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (event) => {
    const imageUrl = event.target.value;
    setFormData({ ...formData, imageUrl, imageFile: null }); // Clear file if URL is provided
    setPreviewImage(imageUrl); // Preview the image
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageFile: file, imageUrl: "" }); // Clear URL if file is uploaded
      setPreviewImage(fileUrl); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    try {
      const response = await axios.post("http://localhost:5000/predict", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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

                <label>Oxygen Saturation</label>
                <input type="number" name="oxygenSaturation" value={formData.oxygenSaturation} onChange={handleChange} required />

                <label>Ejection Fraction</label>
                <input type="number" name="ejectionFraction" value={formData.ejectionFraction} onChange={handleChange} required />

                <label>Weight</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
              </div>
              <div className="form-group2">
                <label>Height</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />

                <label>Heart Rate</label>
                <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} required />

                <label>Cyanosis</label>
                <input type="number" name="cyanosis" value={formData.cyanosis} onChange={handleChange} required />

                <label>Murmur</label>
                <input type="number" name="murmur" value={formData.murmur} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group1">
              <label>Attach a Photo (Upload or Enter URL)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <input type="text" placeholder="Enter image URL" value={formData.imageUrl} onChange={handleImageUrlChange} />
            </div>
            {previewImage && (
              <div className="image-preview">
                <h3>Image Preview</h3>
                <img src={previewImage} alt="Preview" style={{ width: "100%", maxHeight: "300px" }} />
              </div>
            )}
            <button type="submit" className="home-form-inputs-button">Run Test</button>
          </form>
        </div>
        <div className="result-area">
          <h2>Results</h2>
          {result && (
            <div className="results">
              <p><strong>Status:</strong> {result.vsd_status}</p>
              <p><strong>Severity:</strong> {result.severity}</p>
              <p><strong>Condition:</strong> {result.condition}</p>
              <p><strong>Treatment:</strong> {result.treatment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
