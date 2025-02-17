import React from 'react'
import { useEffect } from 'react'
import { useFormik, Field } from 'formik'
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
    validate:function(values){
const errors = {}
if(!values.firstname) errors.firstname="first Name Is required";
if(!values.lastname) errors.lastname="Last name is required";
if(!values.email) {errors.email= "email is required"} 
if(!values.phone) errors.phone="phone number is require";
if(!values.maritual_status) errors.maritual_status="Maritual staatus is required"
if(!values.disability) errors.maritual_status = "maritual status is required"
if(!values.gender) errors.gender = "gender is required"
if(!values.next_of_kin) errors.next_of_kin ="next of kin is required"
if(!values.next_of_kin_phone) errors.next_of_kin_phone = "next of kin phone is required"
return errors
    }
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
                <input 
                type="text" 
                name='firstname'
                value={formik.values.firstname}
                onChange={formik.handleChange } 
                onBlur={formik.handleBlur}  
                />
                {formik.touched.firstname && formik.errors.firstname && (<p className='errors'>{formik.errors.firstname}</p>)}
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">last name *</label>
                <input type="text" name='lastname' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.lastname} />
                {formik.touched.lastname && formik.errors.lastname && (<p className='errors'>{formik.errors.lastname}</p>)}
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">email *</label>
                <input 
    type="text" 
    placeholder='enter your email'
    name='email'
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required />
    {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
            </div>
        </div>
        {/* ************************************************* */}

        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">phone number *</label>
                <input type="number" name='phone'  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.phone} />
                {formik.touched.phone && formik.errors.phone && (<p className='errors'>{formik.errors.phone}</p>)}
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">marital status *</label>
                <select  id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.maritual_status}>
                  {formik.touched.maritual_status && fromik.errors.maritual_status &&(<p className='errors'> {formik.errors.firstname}</p>)}
                  <option value="">select</option>
                <option value="single">Single</option>
                  <option value="married">Married</option>                 
                  <option value="divorced">Divorced</option>
                </select>
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">any dissability *</label>
                <select name="disability" id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.disability}>
                <option value="">select </option>
                <option value="no">No</option>
                  <option value="yes">yes</option>                 
                </select>
            </div>
        </div>
        {/* ************************************************* */}
      
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">gender *</label>
                <select name="" id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.gender}>
                <option value="">select </option>
                <option value="">Male</option>
                  <option value="">Female</option>                 
                </select>
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">next of kin name *</label>
                <input type="text" name='next_of_kin' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.next_of_kin} />
                {formik.touched.next_of_kin && formik.errors.next_of_kin && (<p className='errors'>{formik.errors.next_of_kin}</p>)}
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">next of kin phone number *</label>
                <input type="number"name='next_of_kin_phone'  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.next_of_kin_phone} />
                {formik.touched.next_of_kin_phone && formik.errors.next_of_kin_phone && (<p className='errors'>{formik.errors.next_of_kin_phone}</p>)}
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
