import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axios } from "../../api";
import Hero from "../../components/Hero";
import usePageTitle from "../../hooks/usePageTitle";

const statusColors = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
};

const Orders = () => {
  usePageTitle("My Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/orders")
      .then((res) => setOrders(res.data.orders?.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero title="My Orders" />
      <div className="untree_co-section">
        <div className="container">
          {loading ? (
            <p className="text-center">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted mb-4">You haven't placed any orders yet.</h5>
              <NavLink to="/shop" className="btn btn-primary">Start Shopping</NavLink>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>#{order.id}</strong></td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>{order.items?.length || 0} item(s)</td>
                      <td><strong>${parseFloat(order.total_price).toFixed(2)}</strong></td>
                      <td>
                        <span className={`badge bg-${statusColors[order.status] || "secondary"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${order.payment_status === "paid" ? "success" : "warning"}`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td>
                        <NavLink to={`/my-orders/${order.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
