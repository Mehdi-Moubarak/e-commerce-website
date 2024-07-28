import React from "react";
import { productsData } from "../../../data/products";
import ProductCard from "../../../components/ProductCard";
import { NavLink } from "react-router-dom";

function ExporeProducts() {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">
              Crafted with excellent material.
            </h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.{" "}
            </p>
            <p>
              <NavLink to="" className="btn">
                Explore
              </NavLink>
            </p>
          </div>

          {productsData.map((product) => {
            return <ProductCard product={product} key={product.id}></ProductCard>;
          })}
        </div>
      </div>
    </div>
  );
}

export default ExporeProducts;
