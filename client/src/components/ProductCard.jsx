import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/cartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
      <div className="product-item">
        <NavLink to={`/product/${product.id}`}>
          <img src={product.image} className="img-fluid product-thumbnail" alt={product.name} />
          <h3 className="product-title">{product.name}</h3>
          <strong className="product-price">${product.price}</strong>
        </NavLink>
        <button
          className="btn btn-sm btn-primary mt-2 w-100"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
