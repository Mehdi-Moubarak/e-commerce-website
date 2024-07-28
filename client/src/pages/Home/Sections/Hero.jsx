import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>
                Modern Interior{" "}
                <span clsasNclassName="d-block">Design Studio</span>
              </h1>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <p>
                <NavLink href="" className="btn btn-secondary me-2" to="/shop">
                  Shop Now
                </NavLink>
                <NavLink href="#" className="btn btn-white-outline" to="/shop">
                  Explore
                </NavLink>
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img src="images/couch.png" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
