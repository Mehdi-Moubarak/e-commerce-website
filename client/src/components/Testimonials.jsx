import React from "react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Interior Designer",
    text: "ArtBS has completely transformed how I source furniture for my clients. The quality is exceptional and delivery was faster than expected. I won't shop anywhere else.",
    img: "images/person-1.png",
  },
  {
    name: "James T.",
    role: "Homeowner",
    text: "I ordered a full living room set and every piece exceeded my expectations. The craftsmanship is outstanding and the customer support team was incredibly helpful.",
    img: "images/person-1.png",
  },
  {
    name: "Lena K.",
    role: "Architect",
    text: "Finding modern, minimalist furniture at this price point is rare. ArtBS nails it every time — clean lines, durable materials, and beautiful finishes.",
    img: "images/person-1.png",
  },
];

function Testimonials() {
  return (
    <div className="testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
        </div>
        <div
          id="testimonialsCarousel"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#testimonialsCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner pb-5">
            {testimonials.map((t, i) => (
              <div key={i} className={`carousel-item${i === 0 ? " active" : ""}`} data-bs-interval="5000">
                <div className="row justify-content-center text-center">
                  <div className="col-md-6">
                    <img src={t.img} alt={t.name} className="rounded-circle mb-3"
                      style={{ width: 80, height: 80, objectFit: "cover" }} />
                    <blockquote className="blockquote mb-3">
                      <p className="fst-italic">"{t.text}"</p>
                    </blockquote>
                    <p className="mb-0"><strong>{t.name}</strong></p>
                    <p className="text-muted small">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
