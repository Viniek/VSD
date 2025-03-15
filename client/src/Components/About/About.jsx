import React from "react";
import "./About.css";
import heart from "../../assets/heart1.webp"
import detection from "../../assets/heartDetect.png"
import recomend from "../../assets/recommend.png"
import integrate from "../../assets/integrate.png"
import notification from "../../assets/notification.png"
import UI from "../../assets/UI.png"
import email from "../../assets/email.png"
import phone from "../../assets/phone.png"
import linkedin from "../../assets/linkedIn.webp"

function About() {
  return <>
  <mainSection className="aboutPage">
    {/* section functions */}
    <section className="aboutLeft">
    <h1>Medical Medicine learning AI</h1>
<div className="aboutIntroduction"></div>
{/* <p>VSD (Ventricular Septal Defect) is a congenital heart condition characterized by a hole in the heart's septum. This project aims to help in detecting VSD and other heart conditions using machine learning, recommending treatment options, and integrating an emergency response system.</p> */}
  <div className="features">
  <h1>Functions</h1>
    <ul className="functionsList">      
<li><img src={detection}/><h2>Detection</h2> Uses machine learning to analyze patient data.</li>
<li><img src={recomend}/><h2>Treatment</h2>Provides suggested treatments based on condition severity.</li>
<li><img src={integrate}/> <h2>Emergencies </h2>Connects to emergency services when required.</li>
<li> <img src={notification}/><h2>Notifications</h2> Users receive real-time notifications for bookings and account updates.</li>
<li><img src={UI}/> <h2>Interactive UI</h2> Built with React.js and Flask for seamless user experience.</li>
    </ul>
</div>
    </section>

    {/* section image */}
    <section className="aboutCenter"><img src={heart} alt="heart"/></section>
   
   
   {/* section Contacts */}
    <section className="aboutRight">
      <ul className="aboutContacts">
        <li><h2>Email</h2>njerivictory52@gmail.com</li>
        <li><h2>Phone</h2>+254743209259</li>
        <li><h2>LinkedIn</h2> https://www.linkedin.com/in/victory-njeri-b0a359308/ </li>
        <li><h2>Github</h2>https://github.com/viniek </li>
      </ul>
    </section>
  </mainSection>
  </>;
}

export default About;
