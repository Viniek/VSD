import React from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import './profile.css'
import useUserStore from '../../../Store/userStore'

function Profile() {
  const user  = useUserStore((state)=>state.user)
  function handleCloseOvellay ( event){
    event.preventDefault()
    const close = document.getElementById("ovellay")
    close.style.display="none"
  }
 function handleOpenOvellay(){
  event.preventDefault()
  const close = document.getElementById("ovellay")
  close.style.display="flex"
 }
  async function handleSubmit(values) {
    console.log(values);
    
  }
  const formik = useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      phone:"",
      maritual_status:"",
      disability:"",
      gender:"",
      next_of_kin:"",
      next_of_kin_phone:"",
      
    },
    onSubmit:handleSubmit,
  })
  
  return (
    <div className='profile'>
      <div className='welcome-wrapper'>
    
        <h1> Welcome back {user && user.email}</h1>
        <p>fields marked with * are required</p>
      </div>

      <div className='profile_form_section'>
       <form onSubmit={formik.handleSubmit}>
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">first name *</label>
                <input type="text" onChange={formik.handleChange } onblur={formik.handleBlur}  value={formik.values.firstname}/>
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">last name *</label>
                <input type="text"  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.lastname} />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">email *</label>
                <input type="email"  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.email} />
            </div>
        </div>
        {/* ************************************************* */}

        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">phone number *</label>
                <input type="number"  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.phone} />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">marital status *</label>
                <select name="" id=""  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.maritual_status}>
                  <option value="">select</option>
                <option value="">Single</option>
                  <option value="">Married</option>                 
                  <option value="">Divorced</option>
                </select>
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">any dissability *</label>
                <select name="" id=""  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.disability}>
                <option value="">select </option>
                <option value="">No</option>
                  <option value="">yes</option>                 
                </select>
            </div>
        </div>
        {/* ************************************************* */}
      
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">gender *</label>
                <select name="" id=""  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.gender}>
                <option value="">select </option>
                <option value="">Male</option>
                  <option value="">Female</option>                 
                </select>
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">next of kin name *</label>
                <input type="text"  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.next_of_kin} />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">next of kin phone number *</label>
                <input type="number"  onChange={formik.handleChange } onblur={formik.handleBlur} value={formik.values.next_of_kin_phone} />
            </div>
            
        </div>
        <div className='profile-submit-btn'>
          <button type='submit'>update profile</button>
        </div>
        {/* ************************************************* */}

       </form>


      </div>
      <div className='ovellay' id='ovellay'>

  
<form action="" className='ovelay-form'>
<div className='close-btn-wrapper'>
<button className='close-btn' onClick={handleCloseOvellay}>X</button>
</div>
  <p>Change your password</p>
<label htmlFor="">Old Password</label>
        <input type="text" placeholder='Enter your Old Password' />


<label htmlFor="">New Password</label>
<input type="text" placeholder='Enter your new password' />

<label htmlFor=""> confirm Password</label>
    <input type="text" placeholder='Confirm your Password' />

    <button className='change-password-submit-btn'>submit</button>
  </form>
      
       </div>
       <button className='change-password-btn' onClick={handleOpenOvellay}>change password</button>
  
    </div>
  )
}

export default Profile
