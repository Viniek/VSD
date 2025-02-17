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
    const setUser = useAuthStore((state) => state.setUser);

    function handleSubmit(values) {
        setUser(values);
        toast.success("Sign-up successful! Please log in.", {
            position: "top-right",
            autoClose: 3000,
        });
        
        setTimeout(() => {
            navigate("/");
        }, 3000); // Redirect after 3 seconds
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
        <div className='login-section'>
            <h1>Create an Account</h1>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    <h2><FaCircleUser /></h2>

                    <div className="login-inputs">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.email && formik.errors.email && (<p className='errors'>{formik.errors.email}</p>)}
                    </div>

                    <div className="login-inputs">
                        <label>Password</label>
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

                    <div className="login-inputs">
                        <label>Confirm Password</label>
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

                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className="navigate">
                <p>Already have an account?</p>
                <Link to="./../Login">Login Here</Link>
            </div>
        </div>
    );
}

export default SignUp;

