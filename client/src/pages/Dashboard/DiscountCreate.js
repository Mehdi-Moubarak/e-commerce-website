import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';
import { toast } from 'react-toastify';

export default function DiscountCreate() {
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('label', label);
        formData.append('value', value);

        try {
            await axios.post('/discounts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Discount created successfully.');
            setLabel('');
            setValue('');
        } catch {
            toast.error('Failed to create discount.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-body">
                    <h4 className="text-primary">New Discount</h4>
                    <br />
                    <label className="form-label">Label</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                    />
                    <label className="form-label">Value</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success me-2" disabled={loading}>
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                    <NavLink to="/discount" className="btn btn-outline-secondary">Back</NavLink>
                </div>
            </div>
        </form>
    );
}
