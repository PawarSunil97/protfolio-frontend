import React, { useEffect } from "react";
import { ScreenHeading } from "../../utils/ScreenHeading/ScreenHeading";
import ScrollService from "../../utils/ScrollService";
import Animations from "../../utils/Animations";
import "./AboutMe.css";

export default function AboutMe(props) {
  // fade-in handler
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animation.fadeInScreen(props.id);
  };

   let fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const SCREEN_CONSTSANTS = {
    description:
      "I am a Full-Stack Developer with expertise in React.js, Next.js, Node.js, and Redux, backed by strong knowledge of the MERN stack. I have a proven ability to build efficient, scalable, and user-friendly applications by combining robust front-end design with powerful back-end functionality. Holding an MCA degree, I am committed to contributing my skills as a valuable asset to any organization.",
    highlights: {
      bullets: [
        "Full Stack web development",
        "Interactive Front End as per the design",
        "React.js, Next.js, and Node.js",
        "Redux for State Management",
        "Building REST APIs",
        "Managing Databases",
      ],
      heading: "Here are a Few Highlights:",
    },
  };
  useEffect(() => {
      return () => {
        /* UNSUBSCRIBE THE SUBSCRIPTIONS */
        fadeInSubscription.unsubscribe();
      };
    }, [fadeInSubscription]);
const renderHighlight = () => {
    return SCREEN_CONSTSANTS.highlights.bullets.map((value, i) => (
      <div className="highlight" key={i}>
        <div className="highlight-blob"></div>
        <span>{value}</span>
      </div>
    ));
  };

  return (
    <div
      className="about-me-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="about-me-parent">
        <ScreenHeading title={"About Me"} subHeading={"Why Choose Me?"} />
        <div className="about-me-card">
          <div className="about-me-profile"></div>
          <div className="about-me-details">
            <span className="about-me-description">
              {SCREEN_CONSTSANTS.description}
            </span>
            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>{SCREEN_CONSTSANTS.highlights.heading}</span>
              </div>
              {renderHighlight()}
            </div>
            <div className="about-me-options">
              <button
                className="btn primary-btn"
                onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
              >
                {" "}
                Hire Me{" "}
              </button>
              <a
                  href="sunil_pawar.resume.pdf"
                  download="sunil_pawar_resume.pdf"
                >
                  <button className="btn highlighted-btn">Get Resume</button>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
