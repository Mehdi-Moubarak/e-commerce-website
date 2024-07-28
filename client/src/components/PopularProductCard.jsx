import React from "react";
import { NavLink } from "react-router-dom";

function PopularProductCard({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
      <div className="product-item-sm d-flex">
        <div className="thumbnail">
          <img src={product.image} alt="Image" className="img-fluid" />
        </div>
        <div className="pt-3">
          <h3>{product.name}</h3>
          <p>{product.short_description} </p>
          <p>
            <NavLink to="#">Read More</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PopularProductCard;
