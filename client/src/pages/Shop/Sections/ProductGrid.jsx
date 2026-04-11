import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { axios, STORAGE_URL } from "../../../api";
import { CartContext } from "../../../context/cartContext";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  const fetchProducts = (page = 1, append = false) => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const params = { page };
    if (search) params.search = search;
    if (category) params.category = category;

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    axios
      .get("/products", { params })
      .then((res) => {
        const data = res.data.products;
        if (append) {
          setProducts((prev) => [...prev, ...data.data]);
        } else {
          setProducts(data.data);
        }
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
      })
      .catch(() => {
        if (!append) setProducts([]);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    setProducts([]);
    fetchProducts(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleLoadMore = () => {
    fetchProducts(currentPage + 1, true);
  };

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
        <div className="container text-center py-5">
          <p className="text-muted mb-3">No products found.</p>
          <NavLink to="/shop" className="btn btn-outline-secondary btn-sm">
            Clear search
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
              <div className="product-item">
                <NavLink to={`/product/${product.id}`}>
                  <img
                    src={`${STORAGE_URL}/${product.image}`}
                    className="img-fluid product-thumbnail"
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "/images/product-1.png";
                    }}
                  />
                  <h3 className="product-title">{product.name}</h3>
                  <strong className="product-price">
                    ${parseFloat(product.price).toFixed(2)}
                  </strong>
                </NavLink>
                <button
                  className="btn btn-sm btn-primary mt-2 w-100"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: parseFloat(product.price),
                      image: `${STORAGE_URL}/${product.image}`,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentPage < lastPage && (
          <div className="row">
            <div className="col-12 text-center mt-3 mb-5">
              <button
                className="btn btn-outline-primary px-5 py-2"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
