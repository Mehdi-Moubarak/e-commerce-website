import React from "react";
import Hero from "./Sections/Hero";
import ProductGrid from "./Sections/ProductGrid";
import CategoryFilter from "./Sections/CategoryFilter";
import useSEO from "../../hooks/useSEO";

const Shop = () => {
  useSEO({ title: "Shop", description: "Browse our full collection of modern furniture and home decor. Filter by category and find your perfect piece.", keywords: "shop furniture, buy furniture, home decor online" });
  return (
    <div>
      <Hero />
      <CategoryFilter />
      <ProductGrid />
    </div>
  );
};

export default Shop;
