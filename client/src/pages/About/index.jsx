import React from "react";
import "../../App.css";
import WhyUs from "../../components/WhyUs";
import Testimonials from "../../components/Testimonials";
import Team from "./Sections/Team";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const About = () => {
  usePageTitle("About Us");
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
