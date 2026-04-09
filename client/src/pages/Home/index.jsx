import "../../App.css";
import WhyUs from "../../components/WhyUs";
import Testimonials from "../../components/Testimonials";
import ExporeProducts from "./Sections/ExporeProducts";
import Hero from "../../components/Hero";
import WeHelp from "./Sections/WeHelp";
import PopularProducts from "./Sections/PopularProducts";
import usePageTitle from "../../hooks/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  return (
    <>
      <Hero
        title="This is where we make art comes to life"
        description="Discover our curated collection of modern furniture and interior design pieces crafted to transform your living space."
        buttonText="Shop Now"
      />
      <ExporeProducts />
      <WhyUs />
      <WeHelp />
      <PopularProducts />
      <Testimonials />
    </>
  );
};

export default Home;
