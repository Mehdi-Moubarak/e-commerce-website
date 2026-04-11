import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/admin/stats')
            .then((res) => setStats(res.data))
            .catch(() => setStats(null))
            .finally(() => setLoading(false));
    }, []);

    const cards = stats ? [
        { label: 'Total Revenue', value: `$${parseFloat(stats.total_revenue).toFixed(2)}`, color: 'success', icon: '💰', link: '/order' },
        { label: 'Total Orders', value: stats.total_orders, color: 'primary', icon: '📦', link: '/order' },
        { label: 'Pending Orders', value: stats.pending_orders, color: 'warning', icon: '⏳', link: '/order' },
        { label: 'Products', value: stats.total_products, color: 'info', icon: '🛍️', link: '/productList' },
        { label: 'Customers', value: stats.total_customers, color: 'secondary', icon: '👥', link: '/profile' },
    ] : [];

    return (
        <div>
            <h1 className="mb-4">Dashboard</h1>
            {loading ? (
                <p className="text-muted">Loading stats...</p>
            ) : (
                <>
                    <div className="row mb-5">
                        {cards.map((card) => (
                            <div className="col-6 col-md-4 col-lg-2-4 mb-3" key={card.label} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
                                <NavLink to={card.link} className="text-decoration-none">
                                    <div className={`card text-white bg-${card.color} h-100`}>
                                        <div className="card-body text-center">
                                            <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                                            <h4 className="mt-2 mb-0">{card.value}</h4>
                                            <small>{card.label}</small>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>

                    {stats?.recent_orders?.length > 0 && (
                        <div>
                            <h4 className="mb-3">Recent Orders</h4>
                            <table className="table table-sm table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order #</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recent_orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : '—'}</td>
                                            <td>${parseFloat(order.total_price).toFixed(2)}</td>
                                            <td><span className="badge bg-warning text-dark">{order.status}</span></td>
                                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <NavLink to="/order" className="btn btn-sm btn-outline-primary">View All Orders →</NavLink>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
