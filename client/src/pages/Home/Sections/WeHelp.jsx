import React from "react";
import { NavLink } from "react-router-dom";

function WeHelp() {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img src="images/img-grid-1.jpg" alt="Modern furniture interior" />
              </div>
              <div className="grid grid-2">
                <img src="images/img-grid-2.jpg" alt="Modern furniture interior" />
              </div>
              <div className="grid grid-3">
                <img src="images/img-grid-3.jpg" alt="Modern furniture interior" />
              </div>
            </div>
          </div>
          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">
              We Help You Create Your Perfect Living Space
            </h2>
            <p>
              From concept to delivery, we guide you through every step of
              furnishing your home. Our curated collections blend timeless
              craftsmanship with contemporary design so every room tells your story.
            </p>

            <ul className="list-unstyled custom-list my-4">
              <li>Hand-picked pieces from trusted artisan makers</li>
              <li>Free design consultation with every purchase</li>
              <li>White-glove delivery and professional assembly</li>
              <li>30-day hassle-free returns on all items</li>
            </ul>
            <p>
              <NavLink to="/shop" className="btn">
                Explore
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeHelp;
