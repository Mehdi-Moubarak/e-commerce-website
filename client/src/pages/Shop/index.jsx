import React from "react";
import Hero from "./Sections/Hero";
import ProductGrid from "./Sections/ProductGrid";
import usePageTitle from "../../hooks/usePageTitle";

const Shop = () => {
  usePageTitle("Shop");
  return (
    <div>
      <Hero />
      <ProductGrid />
    </div>
  );
};

export default Shop;
