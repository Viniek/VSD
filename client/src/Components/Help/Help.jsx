import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import heart from '../../assets/Heart.jpg'
import emergency from '../../assets/img4.jpg'
import hospitals from '../../assets/img9.webp'
import schedule from '../../assets/img7.webp'
import "./Help.css";

function Help() {
 function handleSendMessage(e){
e.preventDefault()
alert("Question sent.")
 }

const helpArray = [
  {
    id:1,
    svg:heart,
    heading:"VSD Testing ",
    helpDescription:"To test your VSD status,navigate to home page.You will see a form which you are required to fill with details.click On run test and you will see your VSD result appear on the right side of the page",
    helpButtons:{view:"view",message:"message"},
    
  },
  {
    id:2,
    svg:emergency,
    heading:"Calling An emergency",
    helpDescription:"Navvigate to emergencies section.Submit your name and your emergency description.Click on Submit button which will send your emergency and your location to our team . ",
    helpButtons:{view:"view",message:"message"}
  },
  {
    id:3,
    svg:hospitals,
    heading:"Getting Hospitals near you ",
    helpDescription:"To test your VSD status,navigate to home page.You will see a form which you are required to fill with details.click On run test and you will see your VSD result appear on the right side of the page",
    helpButtons:{view:"view",message:"message"}
  },
  {
    id:4,
    svg:schedule,
    heading:"schedule Appointment",
    helpDescription:"To test your VSD status,navigate to home page.You will see a form which you are required to fill with details.click On run test and you will see your VSD result appear on the right side of the page",
    helpButtons:{view:"view",message:"message"}
  }
]
console.log("help array",helpArray);

  return (
    <div className="help-page">
<section className="help-section">
{ helpArray && helpArray.map((help)=>
  <div key={help.id} className="help-wrapper" id="help-wrapper" >
    <div className="helpsvg">
    <img src={help.svg} alt="" />
    </div>
    <p className="help-heading">{help.heading}</p>
    <p>{help.helpDescription}</p>
    <div className="helpActions">
      <button className="view-help-btn">{help.helpButtons.view}</button>
      <button className="message-button">{help.helpButtons.message}</button>
    </div>

    <div className="help-socials" id="help-socials">
  
{/*  */}
    </div>
  </div>
  
)}
</section>
<div className="faq-section">
  <div>
    <h1>FAQ's</h1>
    <p>How to test vsd</p>
    <p>How does emergency work?</p>
    <p>are my credentials secure?</p>
    <p>what is vsd size</p>
  </div>

  <div className="question-section">
    <h1>Have specific question? </h1>
    <textarea name="" id="" placeholder="Write your question here.."></textarea>
    <button onClick={handleSendMessage}>Send question</button>
  </div>
</div>
    </div>
  );
}

export default Help;
