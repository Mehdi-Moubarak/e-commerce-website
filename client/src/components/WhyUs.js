import React from "react";

function WhyUs() {
  return (
    <div>
      <div className="why-choose-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <h2 className="section-title">Why Choose Us</h2>
              <p>
                We believe your home should reflect who you are. That's why we
                source only the finest furniture and deliver an experience that's
                as beautiful as the pieces we sell.
              </p>

              <div className="row my-5">
                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="images/truck.svg" alt="Fast shipping" className="img-fluid" />
                    </div>
                    <h3>Fast &amp; Free Shipping</h3>
                    <p>Free delivery on all orders over $100. Most items arrive within 3–5 business days.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="images/bag.svg" alt="Easy shopping" className="img-fluid" />
                    </div>
                    <h3>Easy to Shop</h3>
                    <p>Browse by category, filter by price, and find exactly what you need in seconds.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="images/support.svg" alt="24/7 support" className="img-fluid" />
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Our team is available around the clock to answer questions and resolve issues.</p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src="images/return.svg" alt="Easy returns" className="img-fluid" />
                    </div>
                    <h3>Hassle-Free Returns</h3>
                    <p>Not happy? Return any item within 30 days for a full refund, no questions asked.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img
                  src="images/why-choose-us-img.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
