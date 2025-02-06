import React from 'react'
import img1 from '../../assets/img1.jpg'
import './Home.css'
function Home() {
  return (
   <>
   <h3  className='home-heading'>Test your <span> VSD </span> status here</h3>
    <div className='home'>
<section className='home-section'> 
<div className='result-area'>

 <h4>Results will apper here</h4>


<div className='result-section'>
 <div></div>
</div>
</div>

<div className='home-form-section'>
  <form >
<div className="form-section1">
<div className='home-from-inputs'>
    <label>Age</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>Gender</label>
    <select name="" id="">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    </div>

    <div className='home-from-inputs'>
    <label>Oxygen saturation  (%)</label>
    <input type="number" />
    </div>


    <div className='home-from-inputs'>
    <label>Ejection Fraction (%)</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>Weignt (Kg)</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>choresterol</label>
    <input type="number" />
    </div>
</div>
    {/* ...................................................... */}
    <div className='form-section1'>
    <div className='home-from-inputs'>
    <label>height  (Cm)</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>heart rate (Bpm)</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>Cyanosis</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>murmur</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>Systolic</label>
    <input type="number" />
    </div>

    <div className='home-from-inputs'>
    <label>Diastoric</label>
    <input type="number" max={1} min={0} />
    </div>
    </div>


    </form>
    <div className="home-form-inputs-button">
    <button> submit</button>
    </div>
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