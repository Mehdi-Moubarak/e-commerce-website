import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { axios } from "../../api";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const statusColors = {
  pending: "warning", processing: "info", shipped: "primary",
  delivered: "success", cancelled: "danger",
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  usePageTitle(order ? `Order #${order.id}` : "Order Detail");

  useEffect(() => {
    axios.get(`/orders/${id}`)
      .then((res) => setOrder(res.data.order))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div><Hero title="Order Detail" /><div className="container py-5 text-center">Loading...</div></div>;
  if (!order) return (
    <div><Hero title="Order Not Found" />
      <div className="container py-5 text-center">
        <p className="text-muted mb-4">Order not found or you don't have access to it.</p>
        <NavLink to="/my-orders" className="btn btn-primary">Back to Orders</NavLink>
      </div>
    </div>
  );

  return (
    <div>
      <Hero title={`Order #${order.id}`} />
      <div className="untree_co-section">
        <div className="container">
          <NavLink to="/my-orders" className="btn btn-outline-secondary mb-4">← Back to Orders</NavLink>
          <div className="row">
            <div className="col-md-8">
              <h4 className="mb-3">Items Ordered</h4>
              <table className="table table-bordered mb-4">
                <thead className="table-light">
                  <tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                  {order.items?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                      <td>${(item.quantity * item.unit_price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-end"><strong>Order Total</strong></td>
                    <td><strong>${parseFloat(order.total_price).toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
              {order.notes && (
                <div className="mb-4">
                  <h5>Notes</h5>
                  <p className="text-muted">{order.notes}</p>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Order Status</h5>
                  <span className={`badge bg-${statusColors[order.status] || "secondary"} fs-6 mb-2`}>
                    {order.status}
                  </span>
                  <p className="mb-1"><strong>Payment:</strong>{" "}
                    <span className={`badge bg-${order.payment_status === "paid" ? "success" : "warning"}`}>
                      {order.payment_status}
                    </span>
                  </p>
                  <p className="mb-1"><strong>Method:</strong> {order.payment_method?.replace(/_/g, " ")}</p>
                  <p className="mb-0 text-muted small">
                    Placed on {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {order.billing_address && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Billing Address</h5>
                    <p className="mb-0 text-muted small">{order.billing_address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
