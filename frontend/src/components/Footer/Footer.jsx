import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            officiis soluta architecto nihil consequuntur amet beatae debitis,
            animi eius reiciendis similique culpa sit ea nemo, aperiam deserunt
            perferendis a optio!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91 124-546-8560</li>
            <li>customer_care@19restraunt.com</li>
          </ul>
        </div>
      </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 © 19 Restraunts.com - All Rights Reserved.
        </p>
    </div>
  );
};

export default Footer;
