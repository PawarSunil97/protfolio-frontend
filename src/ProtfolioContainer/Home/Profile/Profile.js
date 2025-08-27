import React, { useState } from "react";
// import Typical from "react-typical";
import { ReactTyped } from "react-typed";
import "./Profile.css"
import ScrollService from "../../../utils/ScrollService";

export const Profile = () => {
 
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="cloz">
            <div className="cloz-icon">
            <a href="#">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href="#">
              <i className="fa fa-google-pluse--square"></i>
            </a>
            <a href="https://www.instagram.com/iamsunil_pawar">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-facebook-square"></i>
            </a>
            </div> 
          </div>
          <div className="profile-details-name">
            <span className="primary-text">
              Hello, I'M <span className="highlighted-text">Sunil</span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              <h1>
                    <ReactTyped
                  strings={[
                    "'React Dev ⚛️'",
                    "NEXT JS",
                    "🧑‍💼 Full stack dev",
                    "🚀 MERN stack dev",
                  ]}
                  typeSpeed={70}    // typing speed (lower = slower)
                  backSpeed={40}    // backspace speed
                  backDelay={1500}  // pause before deleting
                  loop
                />

              </h1>
              <span className="profile-role-tagline">
                Love building applications that work seamlessly across front-end and back-end.
              </span>
            </span>
          </div>
          <div className="profile-options">
            
            
           <button 
      className="btn primary-btn" 
      onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
      >
       Hire Me
       </button>

            <a
              href="sunil_pawar.resume.pdf"
              download="sunil sunil_pawar.resume.pdf "
            >
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
};


