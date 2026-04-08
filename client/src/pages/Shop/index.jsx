import React from "react";
import Hero from "./Sections/Hero";
import ProductGrid from "./Sections/ProductGrid";
import CategoryFilter from "./Sections/CategoryFilter";
import usePageTitle from "../../hooks/usePageTitle";

const Shop = () => {
  usePageTitle("Shop");
  return (
    <div>
      <Hero />
      <CategoryFilter />
      <ProductGrid />
    </div>
  );
};

export default Shop;
