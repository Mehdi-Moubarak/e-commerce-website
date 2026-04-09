import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/authContext";
import usePageTitle from "../../hooks/usePageTitle";
import { toast } from "react-toastify";
import { axios } from "../../api";

const Checkout = () => {
  usePageTitle("Checkout");
  const { items, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    state: "",
    postal: "",
    notes: "",
    payment_method: "bank_transfer",
  });
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (items.length === 0) {
      toast.info("Your cart is empty. Add items before checking out.");
      navigate("/cart");
    }
  }, [items, navigate]);

  // Prefill form when user loads
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        first_name: user.first_name || prev.first_name,
        last_name: user.last_name || prev.last_name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await axios.get(`/coupons/${couponCode.trim()}`);
      setDiscount(res.data.discount);
      toast.success(`Coupon applied! ${res.data.discount.value}% off`);
    } catch {
      setDiscount(null);
      toast.error("Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  const discountAmount = discount ? parseFloat((cartTotal * (discount.value / 100)).toFixed(2)) : 0;
  const orderTotal = Math.max(0, cartTotal - discountAmount);

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim()) e.last_name = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    setPlacing(true);
    try {
      const billing = `${form.first_name} ${form.last_name}, ${form.address}, ${form.state} ${form.postal} — ${form.email} ${form.phone}`.trim();

      const res = await axios.post("/orders", {
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        billing_address: billing,
        payment_method: form.payment_method,
        notes: form.notes,
        coupon_code: discount ? couponCode : undefined,
      });

      clearCart();
      toast.success(`Order #${res.data.order.id} placed! Thank you.`);
      navigate("/my-orders");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to place order. Please try again.";
      toast.error(msg);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <div className="untree_co-section">
        <div className="container">
          {!user && (
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="border p-4 rounded" role="alert">
                  Returning customer? <NavLink to="/login" state={{ from: "/checkout" }}>Click here to login</NavLink>
                </div>
              </div>
            </div>
          )}
          <form onSubmit={handlePlaceOrder}>
            <div className="row">
              {/* Billing Details */}
              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                <div className="p-3 p-lg-5 border bg-white">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black">First Name <span className="text-danger">*</span></label>
                      <input name="first_name" value={form.first_name} onChange={handleChange}
                        className={`form-control ${errors.first_name ? "is-invalid" : ""}`} />
                      {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="text-black">Last Name <span className="text-danger">*</span></label>
                      <input name="last_name" value={form.last_name} onChange={handleChange}
                        className={`form-control ${errors.last_name ? "is-invalid" : ""}`} />
                      {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <div className="col-md-12">
                      <label className="text-black">Address <span className="text-danger">*</span></label>
                      <input name="address" value={form.address} onChange={handleChange}
                        placeholder="Street address"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`} />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <div className="col-md-6">
                      <label className="text-black">State / Region</label>
                      <input name="state" value={form.state} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="text-black">Postal / Zip</label>
                      <input name="postal" value={form.postal} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="form-group row mt-3 mb-3">
                    <div className="col-md-6">
                      <label className="text-black">Email <span className="text-danger">*</span></label>
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="text-black">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black">Order Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange}
                      rows="3" className="form-control" placeholder="Any special instructions..." />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-md-6">
                {/* Coupon */}
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                    <div className="p-3 p-lg-5 border bg-white">
                      <label className="text-black mb-3">Enter your coupon code if you have one</label>
                      <div className="input-group couponcode-wrap">
                        <input type="text" className="form-control me-2" placeholder="Coupon Code"
                          value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <button className="btn btn-secondary btn-sm" type="button"
                          onClick={applyCoupon} disabled={couponLoading}>
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {discount && (
                        <p className="text-success mt-2 mb-0">
                          ✓ {discount.value}% discount applied (–${discountAmount.toFixed(2)})
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order table */}
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                    <div className="p-3 p-lg-5 border bg-white">
                      <table className="table site-block-order-table mb-4">
                        <thead>
                          <tr><th>Product</th><th>Total</th></tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name} <strong className="mx-2">×</strong> {item.quantity}</td>
                              <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td><strong>Subtotal</strong></td>
                            <td>${cartTotal.toFixed(2)}</td>
                          </tr>
                          {discount && (
                            <tr className="text-success">
                              <td><strong>Discount ({discount.value}%)</strong></td>
                              <td>–${discountAmount.toFixed(2)}</td>
                            </tr>
                          )}
                          <tr>
                            <td><strong>Order Total</strong></td>
                            <td><strong>${orderTotal.toFixed(2)}</strong></td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Payment method */}
                      <div className="mb-4">
                        <h5 className="mb-3">Payment Method</h5>
                        {[
                          { value: "bank_transfer", label: "Direct Bank Transfer" },
                          { value: "cheque", label: "Cheque Payment" },
                          { value: "cash_on_delivery", label: "Cash on Delivery" },
                        ].map((pm) => (
                          <div key={pm.value} className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="payment_method"
                              id={pm.value} value={pm.value}
                              checked={form.payment_method === pm.value}
                              onChange={handleChange} />
                            <label className="form-check-label" htmlFor={pm.value}>{pm.label}</label>
                          </div>
                        ))}
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg w-100" disabled={placing}>
                        {placing ? "Placing Order..." : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
