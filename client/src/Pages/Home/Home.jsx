import React from 'react'
import img1 from '../../assets/img1.jpg'
import { useFormik} from 'formik'
import './Home.css'
function Home() {

  function handleSubmit(){
    console.log(formik.values);
    
  }
  const formik = useFormik({
    initialValues:{
age:"",
gender:"",
oxygenSaturation:"",
ejectionFraction:"",
weight:"",
choresterol:"",
height:"",
heartRate:"",
cyanosis:"",
murmur:"",
systolic:"",
diastoric:"",

},
    onSubmit:handleSubmit,
    validate:function(values){
      const errors = {};
      if(!values.age) errors.age = "Age is required"
      if(!values.gender) errors.gender = "gender is required"
      if(!values.oxygenSaturation) errors.oxygenSaturation = "oxygenSaturation is required"
      if(!values.ejectionFraction) errors.ejectionFraction = "AejectionFractionis required"
      if(!values.weight) errors.weight = "weight is required"
      if(!values.choresterol) errors.choresterol = "choresterol is required"
      if(!values.height) errors.height = "height is required"
      if(!values.heartRate) errors.heartRate = "heartRate is required"
      if(!values.cyanosis) errors.cyanosis = "cyanosis is required"
      if(!values.murmur) errors.murmur ="murmur is required"
      if(!values.systolic) errors.systolic = "systolic is required"
      if(!values.diastoric) errors.diastoric = "diastoric is required"
      return errors;
    }
    
  })
  return (
   <>
   {/* <h3  className='home-heading'>Test your <span> VSD </span> status here</h3> */}
    <div className='home' id='home'>
<section className='home-section'> 
<div className='result-area'>

 <h4>Results will apper here</h4>

<div className='result-section'>
 <div>
  <div className="results">
  <p className='titles'>Status:</p>
  <p>has vsd</p>
  </div>
  <div className="results">
  <p className='titles'>Severiality:</p>
  <p>Minimal</p>
  </div>
 <div className="results">
 <p className='titles'>Recomendations:</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, facere aperiam repellat consequatur dolor atque nostrum vero quos magni corporis illum saepe minima quo temporibus odit accusamus voluptate? Velit, accusantium!</p>
 </div>

 </div>
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
    />
    {formik.touched.age && formik.errors.age && (<p>{formik.errors.age}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Gender</label>
    <select
     name="gender" 
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.gender}
     >

      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    </div>

    <div className='home-from-inputs'>
    <label>Oxygen saturation  (%)</label>
    <input 
    type="number"
    name='oxygenSaturation'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.oxygenSaturation}
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
     />
     {formik.touched.weight && formik.errors.weight && (<p  className='errors'>{formik.errors.weight}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>choresterol</label>
    <input 
    type="number"
    name='choresterol'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.choresterol}
    />
    {formik.touched.choresterol && formik.errors.choresterol && (<p  className='errors'>{formik.errors.choresterol}</p>)}
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

    />
    {formik.touched.systolic && formik.errors.systolic && (<p  className='errors'>{formik.errors.systolic}</p>)}
    </div>

    <div className='home-from-inputs'>
    <label>Diastoric</label>
    <input 
    type="number" 
    max={1} 
    min={0} 
    name='diastoric'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.diastoric}
    />
    {formik.touched.diastoric && formik.errors.diastoric && (<p  className='errors'>{formik.errors.diastoric}</p>)}
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
  )
}

export default Home