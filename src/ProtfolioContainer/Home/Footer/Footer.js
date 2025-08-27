import React from "react";
import "./Footer.css";
import Shape_Bg from "../../../assets/Home/shape-bg.png"
export default function footer() {
  return (
    <div className="footer-container">
      <div className="footer-parent">
        <img
          src={Shape_Bg}
          alt="you have problem with the image"
        />
      </div>
    </div>
  );
}
