import React from "react";
import "./About.css";

import hero from "../../assets/img6.jpg";
import detection from "../../assets/heartDetect.png";
import recomend from "../../assets/recommend.png";
import integrate from "../../assets/integrate.png";
import notification from "../../assets/notification.png";
import UI from "../../assets/UI.png";
import aboutImage from '../../assets/img1.jpg'
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import linkedin from "../../assets/linkedIn.webp";
import github from "../../assets/github.png";
import twitter from "../../assets/x.png";

import { useFormik}  from 'formik'
import toast, { toastConfig } from "react-simple-toasts";
function About() {  

  const formik = useFormik({
    initialValues:{
      fullName:"",
      phone:"",
      email:"",
      contactMessage:""
    },
    onSubmit:async function(values){
      console.log(formik.values);
      toast(`Message sent 🍞`, { theme: "success" });
      
    },
    validate:function(values){
const errors ={}
if(!values.fullName)errors.fullName="Full Name is required!"
if(!values.phone)errors.phone="phone is required!"
if(!values.email)errors.email="email is required!"
if(!values.contactMessage)errors.contactMessage="message is required!"
return errors
    }
  })
  return (
    <div className="about-section-wrapper">       
      <div className="about-hero">
        <img src={hero} alt={hero} />
        <div className="about-description">
          <h1>WHAT WE OFFER</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut vero asperiores tenetur voluptas molestiae quae laborum nemo commodi neque.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, possimus.</p>
<p>Lorem ipsum dolor sit amet.</p>
<button>More details</button>

        </div>
      </div>
   


     <section className="about-offers">

     <div className="offers-container">
      <img src={recomend} />
                <h2>Treatment</h2>
                <p>Provides suggested treatments based on
                condition severity levels.</p>
      </div>

      <div className="offers-container">
      <img src={integrate} />
       <h2>Emergencies </h2>
      <p> Connects to
      emergency services for immediate medical assistance.</p>
      </div>

      <div className="offers-container">
      <img src={notification} />

                <h2>Notifications</h2> 
                <p>Users receive real-time notifications for
                bookings and account updates.</p>
      </div>

      <div className="offers-container">
          <img src={UI} />
       <h2>Interactive UI</h2> 
<p>       Built with React.js and
Flask for seamless user experience.</p>
      </div>
     </section>

<div className="contact-form-section">
  <div className="contact-image">
<img src={aboutImage} alt="contact us" />
  </div>
<form onSubmit={formik.handleSubmit}>
  <h2>Talk to us today</h2>
  <div className="contact-form-inputs">
    <label >Full name</label>
    <input type="text" name="fullName" placeholder="Enter your name" value={formik.values.fullName}   onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
    {formik.touched.fullName && formik.errors.fullName && (<p className="errors">{formik.errors.fullName}</p>)}
  </div>

  <div className="contact-form-inputs">
    <label >Phone</label>
    <input type="text"name="phone" placeholder="Enter your phone Number" value={formik.values.phone}  onChange={formik.handleChange} onBlur={formik.handleBlur} required />
    {formik.touched.phone && formik.errors.phone && (<p className="errors">{formik.errors.phone}</p>)}
  </div>

  <div className="contact-form-inputs">
    <label >Email</label>
    <input type="email" name="email" placeholder="Enter your Email" value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur} required />
    {formik.touched.email && formik.errors.email && (<p className="errors">{formik.errors.email}</p>)}
  </div>

  <div className="contact-form-inputs">
    <label >Message</label>
    <textarea name="contactMessage"  placeholder="Write your message here" value={formik.values.contactMessage}  onChange={formik.handleChange} onBlur={formik.handleBlur} required></textarea>
    {formik.touched.contactMessage && formik.errors.contactMessage && (<p className="errors">{formik.errors.contactMessage}</p>)}
  </div>

  <div className="contact-form-inputs">
 <button type="submit">Send Message</button>
  </div>
</form>
  <div className="contact-form">

  </div>
</div>


<div className="contact-us-wrapper">

<div className="contact-us-container">
  <div className="contact-us-elements">
  <img src={email} />
<p>Email</p>
  </div>

  <div className="contact-us-elements">
  <img src={github} />
<p>Github</p>
  </div>

  <div className="contact-us-elements">
  <img src={twitter} />
<p>Twitter</p>
  </div>

  <div className="contact-us-elements">
  <img src={linkedin} />
<p>LinkedIn</p>
  </div>
</div>
</div>

      
    </div>
  );
}

export default About;
