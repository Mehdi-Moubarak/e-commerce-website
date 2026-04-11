import React from "react";
import Hero from "../../components/Hero";
import WhyUs from "../../components/WhyUs";
import usePageTitle from "../../hooks/usePageTitle";
import { NavLink } from "react-router-dom";

const services = [
  {
    icon: "🎨",
    title: "Interior Design Consultation",
    description: "Book a free 30-minute session with one of our in-house designers. We'll help you choose pieces that complement your space, palette, and lifestyle.",
  },
  {
    icon: "🚚",
    title: "White-Glove Delivery",
    description: "Our delivery team brings furniture directly to your room, unpacks it, assembles everything, and removes all packaging — zero effort on your part.",
  },
  {
    icon: "🔧",
    title: "Professional Assembly",
    description: "Every order includes a professional assembly option. Our trained technicians ensure your furniture is set up perfectly and safely.",
  },
  {
    icon: "🔄",
    title: "Trade-In Program",
    description: "Ready to upgrade? Trade in your old furniture and get store credit toward your next purchase. We handle collection and responsible disposal.",
  },
  {
    icon: "📐",
    title: "Custom Orders",
    description: "Can't find exactly what you need? We work with our manufacturing partners to create custom pieces in your chosen dimensions, fabric, and finish.",
  },
  {
    icon: "🛡️",
    title: "5-Year Warranty",
    description: "Every product sold through ArtBS comes with a 5-year structural warranty. If it breaks, we fix it or replace it — that's our promise.",
  },
];

const Services = () => {
  usePageTitle("Services");
  return (
    <div>
      <Hero title="Our Services" />
      <div className="untree_co-section">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title mb-3">Everything You Need, Under One Roof</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
                From your first design consultation to years of after-sales support,
                ArtBS is with you every step of the way.
              </p>
            </div>
          </div>
          <div className="row">
            {services.map((s, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-4">
                <div className="border rounded p-4 h-100 bg-white">
                  <div style={{ fontSize: "2.5rem" }} className="mb-3">{s.icon}</div>
                  <h5 className="mb-2">{s.title}</h5>
                  <p className="text-muted mb-0">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <h4 className="mb-3">Ready to get started?</h4>
              <NavLink to="/shop" className="btn btn-primary me-2">Browse Products</NavLink>
              <NavLink to="/contact" className="btn btn-outline-secondary">Contact Us</NavLink>
            </div>
          </div>
        </div>
      </div>
      <WhyUs />
    </div>
  );
};

export default Services;
