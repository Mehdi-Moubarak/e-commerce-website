import React from "react";
import "../../App.css";
import WhyUs from "../../components/WhyUs";
import Testimonials from "../../components/Testimonials";
import Team from "./Sections/Team";
import Hero from "../../components/Hero";

const About = () => {
  return (
    <div>
      <Hero title="About Us" />

      <WhyUs />

      <Team />

      <Testimonials />
    </div>
  );
};

export default About;
