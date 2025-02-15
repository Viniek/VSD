import React from 'react'
import './HealthCenters.css'
import img1 from "../../assets/img1.jpg"
import { BiSolidAmbulance } from "react-icons/bi";
function HealthCenters() {

  const centers = [{
    icon:<BiSolidAmbulance/>,
    title:"nairobi hospital",
    description:"we have best facilities,professional and experienced doctors. We are located at Nairobi,Milimani ,opposite Kenyatta National Hospital",
    facebookIcon:<BiSolidAmbulance/>,
    TwitterIcon:<BiSolidAmbulance/>,
    email:<BiSolidAmbulance/>,

  },

  {
    icon:<BiSolidAmbulance/>,
    title:"JM Kariuki Memorial Hospital",
    description:"we have best facilities,professional and experienced doctors. We are located at Nairobi,Milimani ,opposite Kenyatta National Hospital",
    facebookIcon:<BiSolidAmbulance/>,
    TwitterIcon:<BiSolidAmbulance/>,
    email:<BiSolidAmbulance/>,

  },
  {
    icon:<BiSolidAmbulance/>,
    title:"Thika Hospital",
    description:"we have best facilities,professional and experienced doctors. We are located at Nairobi,Milimani ,opposite Kenyatta National Hospital",
    facebookIcon:<BiSolidAmbulance/>,
    TwitterIcon:<BiSolidAmbulance/>,
    email:<BiSolidAmbulance/>,

  },
  {
    icon:<BiSolidAmbulance/>,
    title:"kikuyu pcea hospital and refferal",
    description:"we have best facilities,professional and experienced doctors. We are located at Nairobi,Milimani ,opposite Kenyatta National Hospital",
    facebookIcon:<BiSolidAmbulance/>,
    TwitterIcon:<BiSolidAmbulance/>,
    email:<BiSolidAmbulance/>,

  }
]
  return (
    <div className='health-center-section'>

      <section  className='health-center-section2'>
        <div className='centers-container'>
      {centers.map((center, index) => (
        <div key={index} className='center-wrapper'>
          <h1>{center.icon}</h1>
          <p className='center-title'> {center.title}</p>
          <p>{center.description}</p>
        <div className='centers-socials'>
          <p>{center.facebookIcon}</p>
          <p>{center.TwitterIcon}</p>
          <p>{center.email}</p>
        </div>
        </div>
      ))}
    </div>
      </section>
</div>
    
  )
}

export default HealthCenters