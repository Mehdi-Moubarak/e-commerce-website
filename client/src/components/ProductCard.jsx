import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { STORAGE_URL } from "../api";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${STORAGE_URL}/${product.image}`;

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
      <div className="product-item">
        <NavLink to={`/product/${product.id}`}>
          <img
            src={imageUrl}
            className="img-fluid product-thumbnail"
            alt={product.name}
            onError={(e) => { e.target.src = "/images/product-1.png"; }}
          />
          <h3 className="product-title">{product.name}</h3>
          <strong className="product-price">${parseFloat(product.price).toFixed(2)}</strong>
        </NavLink>
        <button
          className="btn btn-sm btn-primary mt-2 w-100"
          onClick={() => addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: imageUrl,
          })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
