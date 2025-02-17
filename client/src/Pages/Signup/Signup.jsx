import React from 'react';
import './Signup.css' ; 
import { useFormik } from "formik";
import useAuthStore from '../../../Store/authStore';
import { TbLockPassword } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const navigate = useNavigate();


    function handleSubmit(values) {
navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};
            if (!values.email) errors.email = "Email is required";
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
        type="email"
        placeholder='Enter your email'
        name='text'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
</div>

<div className="sign-inputs">
    <label>last name</label>
    <input
        type="password"
        placeholder='Enter your password'
        name='text'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.password && formik.errors.password && (<p className='errors'>{formik.errors.password}</p>)}
</div>

<div className="sign-inputs">
    <label>email</label>
    <input
        type="email"
        placeholder='Confirm your password'
        name='email'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className='errors'>{formik.errors.confirmPassword}</p>)}
</div>

</section>

{/* ********************************* */}
<section className="sign-section1">

<div className="sign-inputs">
    <label>gender</label>

   <select name="gender" id="">
    <option value="">select</option>
    <option value="male">male</option>
    <option value="female">female</option>
   </select>
</div>

<div className="sign-inputs">
    <label>disability</label>

  <select name="disability" id="">
    <option value="">select</option>
    <option value="no">No</option>
    <option value="yes">Yes</option>
  </select>
</div>

<div className="sign-inputs">
    <label>maritual status</label>

<select name="maritual_status" id="">
    <option value="">select</option>
    <option value="single">single</option>
    <option value="married">married</option>
    <option value="divorved">divorced</option>
</select>
</div>

</section>


<section className="sign-section1">

<div className="sign-inputs">
    <label>phone</label>
    <input  
        type="number"
        placeholder='Enter your email'
        name='phone'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
</div>

<div className="sign-inputs">
    <label>next of kin</label>
    <input
        type="password"
        placeholder='Enter your password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.password && formik.errors.password && (<p className='errors'>{formik.errors.password}</p>)}
</div>

<div className="sign-inputs">
    <label>next of kin phone</label>
    <input
        type="password"
        placeholder='Confirm your password'
        name='confirmPassword'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className='errors'>{formik.errors.confirmPassword}</p>)}
</div>

</section>
<section className="sign-section1">

<div className="sign-inputs">
    <label>password</label>
    <input  
        type="text"
        placeholder='Enter your email'
        name='next_of_kin'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
</div>

<div className="sign-inputs">
    <label>confirm Password</label>
    <input
        type="password"
        placeholder='Enter your password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
    />
    {formik.touched.password && formik.errors.password && (<p className='errors'>{formik.errors.password}</p>)}
</div>



</section>
                    <div className='sign-btn'>
                    <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>

            <div className="navigate">
                <p>Already have an account?</p>
                <Link to="/">Login Here</Link>
            </div>
        </div>
    );
}

export default SignUp;

