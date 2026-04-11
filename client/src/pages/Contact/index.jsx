import React from "react";
import ContactForm from "./Sections/ContactForm";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact Us");
  return (
    <div>
      <Hero title="Contact Us" />
      <ContactForm />
    </div>
  );
};

export default Contact;
