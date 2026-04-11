import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const Hero = ({ title, description, buttonText, buttonLink }) => {
  const isFullHero = Boolean(description || buttonText);

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className={isFullHero ? "col-lg-5" : "col-12"}>
              <div className="intro-excerpt">
                <h1>{title}</h1>
                {description && <p className="mb-4">{description}</p>}
                {buttonText && (
                  <p>
                    <NavLink to={buttonLink || ROUTES.shop} className="btn btn-secondary me-2">
                      {buttonText}
                    </NavLink>
                  </p>
                )}
              </div>
            </div>
            {isFullHero && (
              <div className="col-lg-7">
                <div className="hero-img-wrap">
                  <img src="images/couch.png" className="img-fluid" alt="couch" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
