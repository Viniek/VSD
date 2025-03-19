import React from "react";
import "./About.css";

import hero from "../../assets/img6.jpg";
import detection from "../../assets/heartDetect.png";
import recomend from "../../assets/recommend.png";
import integrate from "../../assets/integrate.png";
import notification from "../../assets/notification.png";
import UI from "../../assets/UI.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import linkedin from "../../assets/linkedIn.webp";
import github from "../../assets/github.png";
import twitter from "../../assets/x.png";

function About() {  
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
<img src={hero} alt="contact us" />
  </div>
<form >
  <div className="contact-form-inputs">
    <label >Full name</label>
    <input type="text" placeholder="Enter your name" />
  </div>

  <div className="contact-form-inputs">
    <label >Phone</label>
    <input type="text" placeholder="Enter your phone Number" />
  </div>

  <div className="contact-form-inputs">
    <label >Email</label>
    <input type="email" placeholder="Enter your Email" />
  </div>

  <div className="contact-form-inputs">
    <label >Message</label>
    <textarea name="contactMessage"  placeholder="Write your message here"></textarea>
  </div>

  <div className="contact-form-inputs">
 <button>Send Message</button>
  </div>
</form>
  <div className="contact-form">

  </div>
</div>


<div className="contact-us-wrapper">

<div className="contact-us-container">
  <div className="contact-us-elements">
  <img src={email} />

  </div>

  <div className="contact-us-elements">
  <img src={github} />

  </div>

  <div className="contact-us-elements">
  <img src={twitter} />

  </div>

  <div className="contact-us-elements">
  <img src={linkedin} />

  </div>
</div>
</div>

      
    </div>
  );
}

export default About;
