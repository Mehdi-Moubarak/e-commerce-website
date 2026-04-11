import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { NavLink } from "react-router-dom";
import { axios, STORAGE_URL } from "../../../api";

function ExporeProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products", { params: { per_page: 3 } })
      .then((res) => {
        const data = res.data.products?.data || [];
        setProducts(data.slice(0, 3));
      })
      .catch(() => setProducts([]));
  }, []);

  const displayProducts = products.length > 0
    ? products.map((p) => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        image: `${STORAGE_URL}/${p.image}`,
        short_description: p.short_description || "",
      }))
    : [];

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">
              Crafted with excellent material.
            </h2>
            <p className="mb-4">
              Every piece in our collection is selected for quality, durability,
              and design. From statement sofas to accent chairs — find something
              you'll love for years.
            </p>
            <p>
              <NavLink to="/shop" className="btn">
                Explore
              </NavLink>
            </p>
          </div>

          {displayProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExporeProducts;
