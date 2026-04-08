import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';
import { toast } from 'react-toastify';

export default function Order() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        axios.get('/payements')
            .then(response => {
                const data = response.data.payements;
                setPayments(data.data || data);
            })
            .catch(() => {
                toast.error('Failed to load payment methods.');
            })
            .finally(() => setLoading(false));
    }, []);

    const deletePayment = (id) => {
        axios.delete('/payementsDelete/' + id)
            .then(() => {
                toast.success('Payment method deleted successfully.');
                setPayments(prev => prev.filter(p => p.id !== id));
                setConfirmId(null);
            })
            .catch(() => {
                toast.error('Failed to delete payment method.');
                setConfirmId(null);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <h1>Payment Methods</h1>
                <br />
                <div>
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Label</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="text-center">Loading...</td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted">No payment methods found.</td>
                                </tr>
                            ) : (
                                payments.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.label}</td>
                                        <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'}</td>
                                        <td>
                                            {confirmId === item.id ? (
                                                <>
                                                    <span className="me-1 text-danger small fw-bold">Sure?</span>
                                                    <button onClick={() => deletePayment(item.id)} className="btn btn-danger btn-sm me-1">Yes</button>
                                                    <button onClick={() => setConfirmId(null)} className="btn btn-secondary btn-sm">No</button>
                                                </>
                                            ) : (
                                                <button onClick={() => setConfirmId(item.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
