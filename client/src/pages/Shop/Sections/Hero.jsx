import React from "react";

function Hero() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-12 ">
              <div className="intro-excerpt d-inline ">
                <h1>Shop</h1>
              </div>
              <div className="mx-2">
              <form className="d-flex ">
             
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
