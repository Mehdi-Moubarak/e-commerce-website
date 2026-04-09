import React, { useState, useEffect } from 'react';
import { axios } from '../../api';
import { toast } from 'react-toastify';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_OPTIONS = ['unpaid', 'paid', 'refunded'];

const statusColors = {
  pending: 'warning', processing: 'info', shipped: 'primary',
  delivered: 'success', cancelled: 'danger',
};

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    axios.get('/admin/orders')
      .then((res) => setOrders(res.data.orders?.data || []))
      .catch(() => toast.error('Failed to load orders.'))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status, payment_status) => {
    setUpdating(id);
    try {
      await axios.put(`/admin/orders/${id}/status`, { status, payment_status });
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status, payment_status: payment_status || o.payment_status } : o));
      toast.success('Order updated.');
    } catch {
      toast.error('Failed to update order.');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mb-4">Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td><strong>#{order.id}</strong></td>
                    <td>
                      {order.customer
                        ? `${order.customer.first_name} ${order.customer.last_name}`
                        : <span className="text-muted">Guest</span>}
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td><strong>${parseFloat(order.total_price).toFixed(2)}</strong></td>
                    <td>
                      <select className="form-select form-select-sm"
                        value={order.status}
                        disabled={updating === order.id}
                        onChange={(e) => updateStatus(order.id, e.target.value, order.payment_status)}>
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <select className="form-select form-select-sm"
                        value={order.payment_status}
                        disabled={updating === order.id}
                        onChange={(e) => updateStatus(order.id, order.status, e.target.value)}>
                        {PAYMENT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                        {expanded === order.id ? 'Hide' : 'Items'}
                      </button>
                    </td>
                  </tr>
                  {expanded === order.id && (
                    <tr>
                      <td colSpan={7} className="bg-light">
                        <strong>Items:</strong>
                        <ul className="mb-1 mt-1">
                          {order.items?.map((item, i) => (
                            <li key={i}>{item.product_name} × {item.quantity} — ${parseFloat(item.unit_price).toFixed(2)} each</li>
                          ))}
                        </ul>
                        {order.billing_address && <p className="mb-0 small text-muted">📍 {order.billing_address}</p>}
                        {order.notes && <p className="mb-0 small text-muted">📝 {order.notes}</p>}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
