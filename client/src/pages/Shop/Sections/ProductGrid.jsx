import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axios, STORAGE_URL } from "../../../api";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;

    setLoading(true);
    axios
      .get("/products", { params })
      .then((res) => {
        setProducts(res.data.products.data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) {
    return (
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <p className="text-center py-5">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <p className="text-center py-5">No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                <a className="product-item" href="#">
                  <img
                    src={`${STORAGE_URL}/${product.image}`}
                    className="img-fluid product-thumbnail"
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "/images/product-1.png";
                    }}
                  />
                  <h3 className="product-title">{product.name}</h3>
                  <strong className="product-price">${parseFloat(product.price).toFixed(2)}</strong>
                  <span className="icon-cross">
                    <img src="/images/cross.svg" className="img-fluid" alt="add" />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
