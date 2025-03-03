import React, { useState } from 'react';
import './Signup.css' ; 
import { useFormik } from "formik";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { api_url } from '../../../utills/config';

function SignUp() {
    const navigate = useNavigate();
    const [loading,setLoading] =useState(false)
    const [error,setError] = useState(null)


   async  function handleSubmit(values) {
    // const sringfied = {
    //     number:String(values.number),textField:(values.textField)
    // }
    //   console.log("values",values);
    const formData = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        gender: values.gender,
        disability: values.disability,
        maritual_status: values.maritual_status,
        phone: values.phone,
        next_of_kin: values.next_of_kin,
        next_of_kin_phone: values.next_of_kin_phone,
        password: values.password,
    };
    
      
try {
    setLoading(true)
    const response = await axios.post(`${api_url}api/users/register`,formData)
    if(response.data.success==true){
       navigate("/") 
    }
    console.log("response",response);
} catch (error) {
    console.log(error);
    setError(error.message)
    
}
finally{
    setLoading(false)
}
        
// navigate("/")
    }

    const formik = useFormik({
        initialValues: {

            firstname:"",
            lastname:"",
            email:"",
            gender:"",
            disability:"",
            maritual_status:"",
            phone:"",
            next_of_kin:"",
            next_of_kin_phone:"",
            password: "",
            confirmPassword: "",
        }, 
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};
            if(!values.firstname) errors.firstname="first name is required"
            if(!values.lastname) errors.lastname="last name is required"
            if(!values.phone) errors.phone="phone number is required"
            if (!values.email) errors.email = "Email is required";
            if(!values.next_of_kin) errors.next_of_kin="next of kin is required"
            if(!values.next_of_kin_phone) errors.next_of_kin_phone="next of kin phone is required"
            if (!values.password) errors.password = "Please enter a password";
            if (values.password !== values.confirmPassword)
                errors.confirmPassword = "Passwords must match";
            return errors;
        }
    });

    return (
        <div className='sign-section'>
            <h1>Create an Account</h1>
            <h2 className='sign-icon'><FaCircleUser /></h2>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    



                    {/* ******************************* */}
                    <section className="sign-section1">

<div className="sign-inputs">
    <label>first name</label>
    <input  
        type="text"
        placeholder='Enter your first name'
        name='firstname'
        value={formik.values.firstname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.firstname && formik.errors.firstname && (<p className='errors'>{formik.errors.firstname}</p>)}
</div>

<div className="sign-inputs">
    <label>last name</label>
    <input
        type="text"
        placeholder='Enter your last name'
        name='lastname'
        value={formik.values.lastname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.lastname && formik.errors.lastname && (<p className='errors'>{formik.errors.lastname}</p>)}
</div>

<div className="sign-inputs">
    <label>email</label>
    <input
        type="email"
        placeholder='enter your email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
</div>

</section>

{/* ********************************* */}
<section className="sign-section1">

<div className="sign-inputs">
    <label>gender</label>

    <select name="gender" id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.gender}>
                <option value="">select </option>
                <option value="male">Male</option>
                  <option value="female">Female</option>                 
                </select>
</div>

<div className="sign-inputs">
    <label>disability</label>

    <select name="disability" id=""  onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.disability}>
                <option value="">select </option>
                <option value="no">No</option>
                  <option value="yes">yes</option>                 
                </select>
</div>

<div className="sign-inputs">
    <label>maritual status</label>

    <select  id="" name='maritual_status' onChange={formik.handleChange } onBlur={formik.handleBlur} value={formik.values.maritual_status}>
          
          <option value="">select</option>
        <option value="single">Single</option>
          <option value="married">Married</option>                 
          <option value="divorced">Divorced</option>
          
        </select>
</div>

</section>


<section className="sign-section1">

<div className="sign-inputs">
    <label>phone</label>
    <input  
        type="number"
        placeholder='Enter your phone number'
        name='phone'
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.phone && formik.errors.phone && (<p className='errors'>{formik.errors.phone}</p>)}
</div>

<div className="sign-inputs">
    <label>next of kin</label>
    <input
        type="text"
        placeholder='Enter your next of kin'
        name='next_of_kin'
        value={formik.values.next_of_kin}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.next_of_kin && formik.errors.next_of_kin && (<p className='errors'>{formik.errors.next_of_kin}</p>)}
</div>

<div className="sign-inputs">
    <label>next of kin phone</label>
    <input
        type="number"
        placeholder='next of kin phone'
        name='next_of_kin_phone'
        value={formik.values.next_of_kin_phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.next_of_kin_phone && formik.errors.next_of_kin_phone && (<p className='errors'>{formik.errors.next_of_kin_phone}</p>)}
</div>

</section>
<section className="sign-section1">

<div className="sign-inputs">
    <label>password</label>
    <input  
        type="password"
        placeholder='create a strong password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.password && formik.errors.password && (<p className='errors'>{formik.errors.password}</p>)}
</div>

<div className="sign-inputs">
    <label>confirm Password</label>
    <input
        type="password"
        placeholder='confirm your password'
        name='confirmPassword'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className='errors'>{formik.errors.confirmPassword}</p>)}
</div>



</section>
{error && <p className='errors'>{error}</p>}

                    <div className='sign-btn'>
                    <button type="submit" disabled={loading}>{loading? "Loadig..":"Submit"}</button>
                    </div>
                   
                </form>
            </div>

            <div className="navigate">
                <p>Already have an account??</p>
                <Link to="/">Login Here</Link>
            </div>
        </div>
    );
}

export default SignUp;

