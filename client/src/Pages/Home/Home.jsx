import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import './Home.css';

function Home() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      age: '',
      gender: '',
      oxygenSaturation: '',
      ejectionFraction: '',
      weight: '',
      cholesterol: '',  // Fixed typo (was "choresterol")
      height: '',
      heartRate: '',
      cyanosis: '',
      murmur: '',
      systolic: '',
      diastolic: '', // Fixed typo (was "diastoric")
      vsdSize: '', // Added missing field
      familyHistory: '', // Added missing field
    },
    validate: function (values) {
      const errors = {};
      if (!values.age) errors.age = 'Age is required';
      if (!values.gender) errors.gender = 'Gender is required';
      if (!values.oxygenSaturation) errors.oxygenSaturation = 'Oxygen Saturation is required';
      if (!values.ejectionFraction) errors.ejectionFraction = 'Ejection Fraction is required';
      if (!values.weight) errors.weight = 'Weight is required';
      if (values.weight < 1) errors.weight = 'Weight must be greater than 1Kg';
      if (values.weight > 150) errors.weight = 'Weight must not exceed 150Kg';
      if (!values.cholesterol) errors.cholesterol = 'Cholesterol is required'; // Fixed typo
      if (!values.height) errors.height = 'Height is required';
      if (!values.heartRate) errors.heartRate = 'Heart Rate is required';
      if (!values.cyanosis) errors.cyanosis = 'Cyanosis is required';
      if (!values.murmur) errors.murmur = 'Murmur is required';
      if (!values.systolic) errors.systolic = 'Systolic is required';
      if (!values.diastolic) errors.diastolic = 'Diastolic is required'; // Fixed typo
      if (!values.vsdSize) errors.vsdSize = 'VSD Size is required'; // Added validation
      if (!values.familyHistory) errors.familyHistory = 'Family History is required'; // Added validation

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setPrediction(null);

      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', values);
        setPrediction(response.data); // Assuming Flask returns JSON with prediction data
      } catch (err) {
        setError('Error connecting to the server. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h3 className='home-heading'>
        Test your <span> VSD </span> status here
      </h3>
      <div className='home' id='home'>
        <section className='home-section'>
          <div className='result-area'>
            <h4>Results will appear here</h4>
            <div className='result-section'>
              {loading && <p>Loading...</p>}
              {error && <p className='error'>{error}</p>}
              {prediction && (
                <div>
                  <div className='results'>
                    <p className='titles'>Status:</p>
                    <p>{prediction.vsd_status}</p>
                  </div>
                  <div className='results'>
                    <p className='titles'>Severity:</p>
                    <p>{prediction.severity}</p>
                  </div>
                  <div className='results'>
                    <p className='titles'>Condition:</p>
                    <p>{prediction.condition}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='home-form-section'>
            <form className='home-form' onSubmit={formik.handleSubmit}>
              <div className='form-section1'>
                {Object.keys(formik.initialValues).map((key) => (
                  <div className='home-from-inputs' key={key}>
                    <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input
                      type={key === 'gender' || key === 'familyHistory' ? 'text' : 'number'}
                      name={key}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[key]}
                      required
                    />
                    {formik.touched[key] && formik.errors[key] && (
                      <p className='errors'>{formik.errors[key]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className='home-form-inputs-button'>
                <button type='submit'>Run Test</button> {/* Explicitly set type="submit" */}
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
