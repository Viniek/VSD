import React, { useState } from 'react'
import { useEffect } from 'react'
import { useFormik, Field } from 'formik'
import './profile.css'
import useUserStore from '../../../Store/userStore'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify/unstyled'
import axios from 'axios'
import { api_url } from '../../../utills/config'
import { useParams } from 'react-router-dom'

function Profile() {
  const user  = useUserStore((state)=>state.user)
 const [loading,setLoading]=useState(false)
 const [error,setError] = useState(null)
 const { userid } = useParams()
useEffect(()=>{
  const getUser = async ()=>{
    try {
      setError(null)
      setLoading(true)
      const response = await axios.get(`${api_url}api/users/getuser/${userid}`,{withCredentials:true})
      console.log(response.data);
      if(response.data.success==true){
        formik.setValues(response.data.data);
      }
      
    } catch (error) {
      setError("error")
    }finally{
      setLoading(false)
    }
  }
  getUser()
},[userid])
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
  async function handleSubmit() {
    toast("Submitted")
    console.log(formik.values);
    
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
  const formik1 = useFormik({
    initialValues:{
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    },
    onSubmit:function(){
      toast("Submitted")
console.log(formik1.values);

    },
    validate:function(values){
      const error = {}
      if(!values.oldPassword) error.oldPassword = "Please enter your Old Password"
      if(!values.newPassword) error.newPassword = "New Password is required"
      if(values.oldPassword == values.newPassword) error.newPassword = "new password cannot be similar to old password "
      if(!values.confirmPassword) error.confirmPassword = "Conirm passwordis required"
      if(values.newPassword !== values.confirmPassword) error.confirmPassword="password did not match"
      return error;
    }
  })
  return (
    <div className='profile'>
      <div className='welcome-wrapper'>
    
        <h1> Welcome {user && user.firstname} to your profile</h1>
        <p>fields marked with * are required</p>
      </div>

      <div className='profile_form_section'>
       <form onSubmit={formik.handleSubmit}>
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label>first name *</label>
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
                <label >last name *</label>
                <input type="text" name='lastname' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.lastname} />
                {formik.touched.lastname && formik.errors.lastname && (<p className='errors'>{formik.errors.lastname}</p>)}
            </div>

            <div className='profile_inputs'>
                <label >email *</label>
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
                <label >phone number *</label>
                <input type="number" name='phone'  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.phone} />
                {formik.touched.phone && formik.errors.phone && (<p className='errors'>{formik.errors.phone}</p>)}
            </div>

            <div className='profile_inputs'>
                <label>marital status *</label>
                <select  id="" name='maritual_status' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.maritual_status}>
          
                  <option value="">select</option>
                <option value="single">Single</option>
                  <option value="married">Married</option>                 
                  <option value="divorced">Divorced</option>
                  
                </select>

            </div>

            <div className='profile_inputs'>
                <label >any dissability *</label>
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
                <label >gender *</label>
                <select name="gender" id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.gender}>
                <option value="">select </option>
                <option value="male">Male</option>
                  <option value="female">Female</option>                 
                </select>
            </div>

            <div className='profile_inputs'>
                <label >next of kin name *</label>
                <input type="text" name='next_of_kin' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.next_of_kin} />
                {formik.touched.next_of_kin && formik.errors.next_of_kin && (<p className='errors'>{formik.errors.next_of_kin}</p>)}
            </div>

            <div className='profile_inputs'>
                <label >next of kin phone number *</label>
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

  
<form action="" className='ovelay-form' onSubmit={formik1.handleSubmit}>
<div className='close-btn-wrapper'>
<button className='close-btn' onClick={handleCloseOvellay}>X</button>
</div>
  <h3>Change your password</h3>
<label htmlFor="">Old Password</label>
        <input type="text" value ={formik1.values.oldPassword} name='oldPassword' placeholder='Enter your Old Password'  onChange={formik1.handleChange} onBlur={formik1.handleBlur}/>
{formik1.touched.oldPassword && formik1.errors.oldPassword && (<p className='errors'>{formik1.errors.oldPassword}</p>)}

<label htmlFor="">New Password</label>
<input type="text" value={formik1.values.newPassword} name='newPassword' placeholder='Enter your new password' onChange={formik1.handleChange} onBlur={formik1.handleBlur} />
{formik1.touched.newPassword && formik1.errors.newPassword && (<p className='errors'>{formik1.errors.newPassword}</p>)}

<label htmlFor=""> confirm Password</label>
    <input type="text" value={formik1.values.confirmPassword} placeholder='Confirm your Password' name='confirmPassword'  onChange={formik1.handleChange} onBlur={formik1.handleBlur}/>
{formik1.touched.confirmPassword && formik1.errors.confirmPassword && (<p className='errors'>{formik1.errors.confirmPassword}</p>)}
    <button className='change-password-submit-btn'>submit</button>
  </form>
      
       </div>
       <button className='change-password-btn' onClick={handleOpenOvellay}>change password</button>
  
    </div>
  )
}

export default Profile
