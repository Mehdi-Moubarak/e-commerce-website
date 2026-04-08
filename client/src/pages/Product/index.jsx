import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { axios, STORAGE_URL } from "../../api";
import { CartContext } from "../../context/cartContext";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  usePageTitle(product ? product.name : "Product");

  if (loading) {
    return (
      <div>
        <Hero title="Product" />
        <div className="container py-5 text-center">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Hero title="Product" />
        <div className="container py-5 text-center">
          <h4 className="text-muted mb-4">Product not found.</h4>
          <NavLink to="/shop" className="btn btn-primary">
            Back to Shop
          </NavLink>
        </div>
      </div>
    );
  }

  const imageUrl = product.image
    ? `${STORAGE_URL}/${product.image}`
    : "/images/product-1.png";

  return (
    <div>
      <Hero title={product.name} />
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <img
                src={imageUrl}
                className="img-fluid rounded"
                alt={product.name}
                onError={(e) => {
                  e.target.src = "/images/product-1.png";
                }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-black mb-3">{product.name}</h2>
              <h4 className="mb-4" style={{ color: "#3b5d50" }}>
                ${parseFloat(product.price).toFixed(2)}
              </h4>

              {product.description && (
                <div className="mb-4">
                  <p className="text-muted">{product.description}</p>
                </div>
              )}

              {product.stock !== undefined && (
                <p className="mb-3">
                  <strong>Availability: </strong>
                  {product.stock > 0 ? (
                    <span className="text-success">In Stock ({product.stock})</span>
                  ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
                </p>
              )}

              {product.category && (
                <p className="mb-4">
                  <strong>Category: </strong>
                  <NavLink to={`/shop?category=${product.category.id}`}>
                    {product.category.name}
                  </NavLink>
                </p>
              )}

              <button
                className="btn btn-primary px-4 py-2 me-2"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: imageUrl,
                  })
                }
              >
                Add to Cart
              </button>
              <NavLink to="/shop" className="btn btn-outline-secondary px-4 py-2">
                Continue Shopping
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
