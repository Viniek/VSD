import React, { useState } from "react";
import axios from "axios";
import "./Home.css";


const Home = () => {
  const [formData, setFormData] = useState({ imageFile: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading]=useState(false)

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ imageFile: file });
      setPreviewImage(fileUrl);
      setError(null); 
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile) {
      setError("❌ Please upload an image before analyzing.");
      return;
    }

    const data = new FormData();
    data.append("image", formData.imageFile);

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:5000/predict", data);
      console.log("Prediction Response:", response);
      setResult(response.data); 
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setError(`❌ ${error.response.data.error || "Prediction failed. Please try again."}`);
      } else {
        setError("❌ Network or server error. Please try again.");
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="home">
      <div className="home-section">
        <div className="home-form-section">
          <form onSubmit={handleSubmit}>
            <label>Upload an X-ray Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {previewImage && (
              <div className="image-preview">
                <h3>Image Preview</h3>
                <img src={previewImage} alt="Preview" style={{ width: "100%", maxHeight: "300px" }} />
              </div>
            )}

            <button type="submit" className="home-form-inputs-button" disabled={loading}>{loading?"Loading please wait":"Analyze"}</button>
          </form>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="result-area">
          <h2>{loading?<h3 className="loading">Analyzing the image.Please wait...</h3>:"Results"}</h2>
          {result && (
            <div className="results">
              <p><strong>Diagnosis:</strong> 
                {result.prediction === 0 
                  ? "✅ No heart issue detected" 
                  : <div>
                    <p>⚠️ Vsd  issue detected.</p>
                    <h3>Recomendation</h3>
                    <p> Consult a doctor.</p>
                    </div>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
