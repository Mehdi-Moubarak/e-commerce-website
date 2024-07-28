import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/constants";
const Hero = ({ title }) => {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>{title}</h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>
                <p>
                  <NavLink to={ROUTES.shop} className="btn btn-secondary me-2">
                    Shop Now
                  </NavLink>
                  
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src="images/couch.png" className="img-fluid" alt="couch" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
