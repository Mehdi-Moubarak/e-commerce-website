import React from "react";
import Hero from "../../components/Hero";
import CartGrid from "./Sections/CartGrid";
import usePageTitle from "../../hooks/usePageTitle";

const Cart = () => {
  usePageTitle("Cart");
  return (
    <div>
      <Hero title="Cart" />
      <CartGrid />
    </div>
  );
};

export default Cart;
