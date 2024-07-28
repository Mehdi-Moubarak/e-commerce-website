import "../../App.css";
import WhyUs from "../../components/WhyUs";
import Testimonials from "../../components/Testimonials";
import ExporeProducts from "./Sections/ExporeProducts";
import Hero from "../../components/Hero";
import WeHelp from "./Sections/WeHelp";
import PopularProducts from "./Sections/PopularProducts";

const Home = () => {
  return (
    <>
      <Hero title="This is where we make art comes to life" />

      <ExporeProducts />

      <WhyUs />

      <WeHelp />

      <PopularProducts />

      <Testimonials />

      
    </>
  );
};

export default Home;
