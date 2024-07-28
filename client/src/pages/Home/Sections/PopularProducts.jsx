import React from "react";
import PopularProductCard from "../../../components/PopularProductCard";
import { productsData } from "../../../data/products";

function PopularProducts() {
  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">
          {productsData.map((product) => (
            <PopularProductCard product={product} key={product.id} ></PopularProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
