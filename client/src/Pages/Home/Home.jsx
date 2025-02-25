import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import './Home.css';

function Home() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function handleSubmit(values){
    
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
  }
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
    onSubmit: handleSubmit
  });

  return (
    <>

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

            <form  className='home-form' onSubmit={formik.handleSubmit}>

<div className="form-section1">
<div className='home-from-inputs'>
    <label id='label'>Age</label>
    <input 
    type="number"
    name='age'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.age}
    required
    max={150}
    min={0}
    />
    {formik.touched.age && formik.errors.age && (<p  className='errors'>{formik.errors.age}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Gender</label>
   

 <input type="text" 
    name="gender" 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.gender}
    required/>
   
    </div>

    <div className='home-from-inputs'>
    <label>Oxygen saturation  (%)</label>
    <input 
    type="number"
    name='oxygenSaturation'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.oxygenSaturation}
    required
    max={100}
    min={1}
    />
    {formik.touched.oxygenSaturation && formik.errors.oxygenSaturation && (<p  className='errors'>{formik.errors.oxygenSaturation}</p>)}
    </div>


    <div className='home-from-inputs'>
    <label>Ejection Fraction (%)</label>
    <input 
    type="number" 
    name='ejectionFraction'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.ejectionFraction}
    required
    max={100}
    min={1}
    />
    {formik.touched.ejectionFraction && formik.errors.ejectionFraction && (<p  className='errors'>{formik.errors.ejectionFraction}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Weignt (Kg)</label>
    <input
     type="number"
     name='weight'
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.weight}
     required
     max={250}
     min={2}
     />
     {formik.touched.weight && formik.errors.weight && (<p  className='errors'>{formik.errors.weight}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>choresterol</label>
    <input 
    type="number"
    name='cholesterol'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.cholesterol}
    required
    max={1}
    min={0}
    />
    {formik.touched.cholesterol && formik.errors.cholesterol && (<p  className='errors'>{formik.errors.choresterol}</p>)}
    </div>


    <div className='home-from-inputs'>
    <label>vsd Size</label>
    <input 
    type="number"
    name='vsdSize'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.vsdSize}
    required
    max={1}
    min={0}
    />
    {formik.touched.vsdSize && formik.errors.vsdSize && (<p  className='errors'>{formik.errors.vsdSize}</p>)}
    </div>
</div>
    {/* ...................................................... */}
    <div className='form-section1'>
    <div className='home-from-inputs'>
    <label>height  (Cm)</label>
    <input 
    type="number" 
    name='height'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.height}
    required
    max={250}
    min={30}
    />
    {formik.touched.height && formik.errors.height && (<p  className='errors'>{formik.errors.height}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>heart rate (Bpm)</label>
    <input 
    type="number"
    name='heartRate'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.heartRate}
    required
    max={200}
    min={10}
    />
    {formik.touched.heartRate && formik.errors.heartRate && (<p  className='errors'>{formik.errors.heartRate}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Cyanosis</label>
    <input 
    type="number"
    name='cyanosis'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.cyanosis}
    required
    max={1}
    min={0}
    />
    {formik.touched.cyanosis && formik.errors.cyanosis && (<p  className='errors'>{formik.errors.cyanosis}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>murmur</label>
    <input 
    type="number" 
    name='murmur'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.murmur}
    required
    max={1}
    min={0}
    />
    {formik.touched.murmur && formik.errors.murmur && (<p  className='errors'>{formik.errors.murmur}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Systolic</label>
    <input 
    type="number"
    name='systolic'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.systolic}
    required
    max={259}
    min={0}

    />
    {formik.touched.systolic && formik.errors.systolic && (<p  className='errors'>{formik.errors.systolic}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Diastoric</label>
    <input 
    type="number" 
    max={1} 
    min={0} 
    name='diastolic'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.diastolic}
    required
     
    />
    {formik.touched.diastolic && formik.errors.diastolic && (<p  className='errors'>{formik.errors.diastolic}</p>)}
    </div>


    <div className='home-from-inputs'>
    <label>family History</label>
    <input 
    type="text" 
    max={1} 
    min={0} 
    name='familyHistory'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.familyHistory}
    required
     
    />
    {formik.touched.familyHistory && formik.errors.familyHistory && (<p  className='errors'>{formik.errors.familyHistory}</p>)}
    </div>
    <div className="home-form-inputs-button">
    <button>  run test</button>
    </div>

    </div>




    </form>
          </div>
        </section>
        
  <div className='action-btns'>
    <button className='clear'>clear</button>
    <button className='save'>save</button>
    <button className='emergency'>call emegency</button>
  </div>
      </div>
    </>
  );
}

export default Home;
