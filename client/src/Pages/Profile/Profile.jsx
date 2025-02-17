import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import './profile.css'
import useUserStore from '../../../Store/userStore'

function Profile() {
  const user  = useUserStore((state)=>state.user)

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
        <p>Update your profile here</p>
      </div>

      <div className='profile_form_section'>
       <form onSubmit={formik.handleSubmit}>
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>
        </div>
        {/* ************************************************* */}

        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>
        </div>
        {/* ************************************************* */}
      
        <div className='profile_form_fields'>
            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>

            <div className='profile_inputs'>
                <label htmlFor="firstname">first name</label>
                <input type="text" />
            </div>
        </div>
        {/* ************************************************* */}
       </form>
      </div>
    </div>
  )
}

export default Profile
