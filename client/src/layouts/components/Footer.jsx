import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className=" bg-primary bg-gradient">
        <footer className="footer-section  ">
          <div className="container relative">
            <div className="sofa-img">
              <img src="images/sofa.png" alt="sofa" className="img-fluid"></img>
            </div>

            <div className="row g-5 mb-5">
              <div className="col-lg-4">
                <div className="mb-4 footer-logo-wrap">
                  <NavLink to="/" className="footer-logo">
                    <span>ArtBS.</span>
                  </NavLink>
                </div>
                <q className="mb-4">
                  Donec facilisis quam ut purus rutrum lobortis. Donec vitae
                  odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
                  Aliquam vulputate velit imperdiet dolor tempor tristique.
                  Pellentesque habitant
                </q>

                <ul className="list-unstyled custom-social">
                  <li>
                    <NavLink to="#">
                      <span className="fa fa-brands fa-facebook-f"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <span className="fa fa-brands fa-twitter"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <span className="fa fa-brands fa-instagram"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <span className="fa fa-brands fa-linkedin"></span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-lg-8">
                <div className="row links-wrap">
                  <div className="col-6 col-sm-6 col-md-3">
                    <ul className="list-unstyled">
                      <li>
                        <NavLink to="/about">About us</NavLink>
                      </li>
                      <li>
                        <NavLink to="/services">Services</NavLink>
                      </li>
                      <li>
                        <NavLink to="/shop">Shop</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">Contact us</NavLink>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-sm-6 col-md-3">
                    <ul className="list-unstyled">
                      <li>
                        <NavLink to="#">Our team</NavLink>
                      </li>

                      <li>
                        <NavLink to="#">Privacy Policy</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-top copyright">
              <div className="row pt-4">
                <div className="col-lg-6"></div>

                <div className="col-lg-6 text-center text-lg-end">
                  <ul className="list-unstyled d-inline-flex ms-auto">
                    <li className="me-4">
                      <NavLink to="#">Terms &amp; Conditions</NavLink>
                    </li>
                    <li>
                      <NavLink to="#">Privacy Policy</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}

export default Footer;
