import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { axios, STORAGE_URL } from "../../api";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/authContext";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios.get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    axios.get("/comments")
      .then((res) => {
        const all = res.data.comments?.data || res.data.comments || [];
        setReviews(all.filter((c) => String(c.product) === String(id) || String(c.product_id) === String(id)));
      })
      .catch(() => setReviews([]));
  }, [id]);

  usePageTitle(product ? product.name : "Product");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSubmitting(true);
    try {
      const res = await axios.post("/comments", { label: reviewText, product: id });
      setReviews((prev) => [res.data.comment || { id: Date.now(), label: reviewText, user: user?.first_name }, ...prev]);
      setReviewText("");
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review. Please log in first.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div><Hero title="Product" />
      <div className="container py-5 text-center"><p>Loading product...</p></div>
    </div>
  );

  if (error || !product) return (
    <div><Hero title="Product" />
      <div className="container py-5 text-center">
        <h4 className="text-muted mb-4">Product not found.</h4>
        <NavLink to="/shop" className="btn btn-primary">Back to Shop</NavLink>
      </div>
    </div>
  );

  const imageUrl = product.image ? `${STORAGE_URL}/${product.image}` : "/images/product-1.png";

  return (
    <div>
      <Hero title={product.name} />
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 mb-4">
              <img src={imageUrl} className="img-fluid rounded" alt={product.name}
                onError={(e) => { e.target.src = "/images/product-1.png"; }} />
            </div>
            <div className="col-md-6">
              <h2 className="text-black mb-3">{product.name}</h2>
              <h4 className="mb-4" style={{ color: "var(--color-primary, #3b5d50)" }}>
                ${parseFloat(product.price).toFixed(2)}
              </h4>
              {product.description && <p className="text-muted mb-4">{product.description}</p>}
              {product.stock !== undefined && (
                <p className="mb-3">
                  <strong>Availability: </strong>
                  {product.stock > 0
                    ? <span className="text-success">In Stock ({product.stock})</span>
                    : <span className="text-danger">Out of Stock</span>}
                </p>
              )}
              {product.category && (
                <p className="mb-4">
                  <strong>Category: </strong>
                  <NavLink to={`/shop?category=${product.category.id}`}>{product.category.nameCategory || product.category.name}</NavLink>
                </p>
              )}
              <button className="btn btn-primary px-4 py-2 me-2"
                disabled={product.stock === 0}
                onClick={() => addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), image: imageUrl })}>
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <NavLink to="/shop" className="btn btn-outline-secondary px-4 py-2">Continue Shopping</NavLink>
            </div>
          </div>

          {/* Reviews */}
          <div className="row">
            <div className="col-12">
              <hr />
              <h4 className="mb-4">Customer Reviews ({reviews.length})</h4>
              {user ? (
                <form onSubmit={handleReviewSubmit} className="mb-5">
                  <div className="mb-3">
                    <label className="form-label">Write a review</label>
                    <textarea className="form-control" rows={3} value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this product..." required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              ) : (
                <p className="text-muted mb-4">
                  <NavLink to="/login">Log in</NavLink> to leave a review.
                </p>
              )}
              {reviews.length === 0 ? (
                <p className="text-muted">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review, i) => (
                  <div key={review.id || i} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <strong>{typeof review.user === "object" ? `${review.user.first_name} ${review.user.last_name}` : (review.user || "Customer")}</strong>
                      <small className="text-muted">{review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}</small>
                    </div>
                    <p className="mb-0">{review.label}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
