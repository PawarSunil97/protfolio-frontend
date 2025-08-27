import React, { useEffect, useState } from "react";
import { ScreenHeading } from "../../utils/ScreenHeading/ScreenHeading";
import ScrollService from "../../utils/ScrollService";
import Animations from "../../utils/Animations";
import "./Resume.css"
export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0); // fixed typo (Bulet → Bullet)
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  // ✅ FadeIn Animation
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animation.fadeInScreen(props.id); // ✅ corrected Animations.animation → Animations.animations (assuming your utils has that)
  };
   let fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  // ✅ Resume Heading Component
const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };


  // ✅ Bullets Menu
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
  ];

  // ✅ Skills
  const programmingSkillDetails = [
    { skill: "JavaScript", ratingPercentage: 80 },
    { skill: "React Js", ratingPercentage: 85 },
    { skill: "Redux", ratingPercentage: 70 },
    { skill: "TypeScript", ratingPercentage: 70 },
    { skill: "Node Js", ratingPercentage: 60 },
    { skill: "Express Js", ratingPercentage: 70 }, // fixed typo Expres
    { skill: "EJS", ratingPercentage: 85 },
    { skill: "MongoDB", ratingPercentage: 90 }, // fixed typo MongoDb
    { skill: "HTML", ratingPercentage: 90 }, // fixed typo HTNL
    { skill: "CSS", ratingPercentage: 90 },
    { skill: "Bootstrap", ratingPercentage: 80 }, // fixed typo Boostrap
    { skill: "Material UI", ratingPercentage: 70 },
    { skill: "Tailwind CSS", ratingPercentage: 70 },
  ];

  // ✅ Projects
  const projectDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2025", toDate: "2025" },
      description:
        "A personal portfolio website to showcase all my details and projects in one place.",
      subHeading: "Technologies Used: React JS, Node Js and Bootstrap",
    },
    {
      title: "Wanderlust",
      duration: { fromDate: "2024", toDate: "2025" },
      description:
        "Developed a full-stack travel blog web app using Node.js, EJS, and MongoDB with complete CRUD functionality. Implemented MVC architecture for scalability and maintainability. Designed dynamic, user-friendly pages for creating, editing, and viewing travel posts.",
      subHeading: "Technologies Used: Node.js, Express.js, EJS, MongoDB, MVC Architecture",
    },
  ];

  // ✅ Resume Details (screens)
  const resumeDetails = [
    /* Education */
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"Government College Of Engineering Karad"}
        subHeading={"Master of Applications"}
        fromDate={"2020"}
        toDate={"2022"}
      />
      <ResumeHeading
        heading={"Raje Ramrao College Jath"}
        subHeading={"Bachelor of Computer Applications"}
        fromDate={"2017"}
        toDate={"2020"}
      />
    </div>,

    /* Work Experience */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
      <ResumeHeading
        heading={"Thinkbiz Technology"}
        subHeading={"Front End Developer"}
        fromDate={"2023"}
        toDate={"Present"}
      />
      <div className="experience-description">
          <span className="resume-description-text">
          Currently working as Front End React Developer.
        </span>
      </div>
      <div className="experience-description">
          <span className="resume-description-text">
          - Working on JERA, the largest power generation company in Japan, which supplies approximately 30% of the country’s electricity.
        </span>
        <br />
       <span className="resume-description-text">
          - Responsible for developing new features, refactoring code, and maintaining responsive, reusable components while ensuring scalability and code quality.
            </span>
            <br />
            </div>
            </div>
    </div>,

    /* Skills */
     <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    /* Projects */
   <div className="resume-screen-container" key="projects">
      {projectDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

  ];

  // ✅ Handle Carousal
  const handleCarousal = (index) => {
    let offsetHeight = 360;
    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };
    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  // ✅ Bullets Renderer
  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"}
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="oops... no internet connection"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  // ✅ Resume Screen Renderer
  const getResumeScreen = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
      );
      
  };
useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);
  return  (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreen()}</div>
        </div>
      </div>
    </div>
  );
}
