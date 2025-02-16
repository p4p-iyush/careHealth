import React from "react";
import { Link } from "react-router-dom";
// import { TbEmergencyBed } from "react-icons/tb";
import { MdEmergency } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";   
import { FaArrowRightLong } from "react-icons/fa6";
import docter from '../../assets/doctor.jpg'
import Slider from '../Slider/ImageSlider';
import "./LoginPage.css";
import {
  FaUserCog,
  FaStethoscope,
  FaUserMd,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";

// import video from "../../assets/doctor.mp4";
// import "./LoginPage.css";



export default function HomePage() {
  
  const images = [
    // '../src/assets/Pharmacy.jpg',
    
    '../src/assets/doctor.jpg',
    
    '../src/assets/doctor2.jpg',
    '../src/assets/doctor3.jpg',
    '../src/assets/doctor4.jpg'
  ];


  return (


    <div className="homepage-container">
      <Slider images={images}/>
     
      <div className="parent">
        <div className="box1">
          <h2 id="h2">24 Hours service</h2>
          <div className="child-box1">
            <p id="p">6
              This idea ties into the idea of 24/7 service, where time is always
              ticking, but theres always an opportunity to do something
              impactful or positive.
            </p>
          </div>
          <button id="read">Read more</button>
        </div>
        <div className="box2">
          <h2 id="h2">Happy with you smile</h2>
          <div className="child-box2">
            <p id="p">
              Cum sociis natoque penatibus et magnis dis parturient montesmus.
              Pro vel nibh et elit mollis commodo et nec augue tristique sed
              volutpat.
            </p>
          </div>
          <button id="read">Read more</button>
        </div>
        <div className="box3">
          <h2 id="h2">opening hours</h2>
          <div className="child-box3">
            <p id="p">
              Time 8 AM to 10 PM <br />
              Monday <br />
              Tuesday
            </p> 
            <button id="read">Read more</button>
          </div>
         
        </div>
      </div>

      {/* Login Section */}
      {/* <h2 className="section-title">Login</h2> */}
      <div className="login-type-container">
        <Link to="/admin-login" className="login-card">
          <FaUserCog size={50} />
          <span>Admin Login</span>
        </Link>
        <Link to="/patient-login" className="login-card">
          <FaStethoscope size={50} />
          <span>Patient Login</span>
        </Link>
        <Link to="/doctor-login" className="login-card">
          <FaUserMd size={50} />
          <span>Doctor Login</span>
        </Link>
        <Link to="/pharmacy-login" className="login-card">
          <FaPrescriptionBottleAlt size={50} />
          <span>Pharmacy Login</span>
        </Link>
      </div>
 
      <div className="information">
        <div className="inbox">
        <MdEmergency id="icons" size={50}/>
        <br />
          <h4 id="h2">Emergency</h4>
          <br />
          
          One of the key classifications is between traditio nal small molecule
          drugs; usually derived from chemical synthesis.
          <button id="lern-btn"> learn more <FaArrowRightLong />
          </button>
        </div>
       
        <div className="inbox">
        <FaHeartbeat id="icons" size={50} />
        <br />
          <h4 id="h2">Heart Diseases</h4>
          <br />One of the key classifications is between
          traditio nal small molecule drugs; usually derived from chemical
          synthesis.
          <button id="lern-btn"> learn more <FaArrowRightLong />
          </button>
        </div>
        <div className="inbox"> 
            <FaHandHoldingMedical id="icons" size={50}/>
            <br />
          <h4 id="h2">Orthopaedic</h4>
          <br />
          One of the key classifications is between traditio nal small molecule
          drugs; usually derived from chemical synthesis.
          <button id="lern-btn"> learn more <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
    
  );
}