import React, { useEffect, useState, useCallback } from "react";
import { Typewriter } from 'react-simple-typewriter';
import axios from "axios";
import { toast } from "react-toastify";
import imgBack from "../../assets/images/mailz.jpeg";
import load1 from "../../assets/images/load2.gif";
import ScrollService from "../../utils/ScrollService";
import { ScreenHeading } from "../../utils/ScreenHeading/ScreenHeading";
import Animations from "../../utils/Animations";
import Footer from "../footer/Footer";
import "./ContactMe.css";

const API = "https://sunil-protfolio.protfolio-backend-iota-olive.vercel.app";
export default function ContactMe( props) {
  // State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);
 

    const fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animation.fadeInScreen(props.id);
    };

    const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
  useEffect(() => {
    return () => {
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);
  // Input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      console.log(API)
     const res = await axios.post(`${API}/api/contact`, formData);
      if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setBanner(""), 3000);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      console.error(error);
    } finally {
      setLoading(false);
     
    }
    
  };

  return (
    <div className="main-container fade-in" id={props.id || " "}>
      <ScreenHeading subHeading="Let's Keep In Touch" title="Contact Me" />

      <div className="central-form">
        {/* Left Side */}
        <div className="col">
          <h2 className="title">
              
             <Typewriter
                            words={['Get In Touch 📧', 'Send Email 📧']}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                         delaySpeed={1000}
                
                            />
          </h2>
          <a href="#"><i className="fa fa-facebook-square" /></a>
          <a href="#"><i className="fa fa-google-plus-square" /></a>
          <a href="https://www.instagram.com/iamsunil_pawar" target="_blank" rel="noreferrer">
            <i className="fa fa-instagram" />
          </a>
        </div>

        {/* Right Side Form */}
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="mail background" />
          </div>

          <form onSubmit={handleSubmit}>
            <p>{banner}</p>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />

            <div className="send-btn">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <b className="load">
                    <img src={load1} alt="loading" />
                  </b>
                ) : (
                  <>
                    Send <i className="fa fa-paper-plane" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
