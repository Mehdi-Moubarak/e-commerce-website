import React from "react";
import { NavLink } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
      <NavLink className="product-item" to="#">
        <img src={product.image} className="img-fluid product-thumbnail" />
        <h3 className="product-title">{product.name}</h3>
        <strong className="product-price">${product.price}</strong>

        <span className="icon-cross">
          <img src="images/cross.svg" className="img-fluid" />
        </span>
      </NavLink>
    </div>
  );
}

export default ProductCard;
