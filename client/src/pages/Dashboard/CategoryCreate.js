import React from 'react';
import { useState } from "react";
import { axios } from '../../api';
import { toast } from 'react-toastify';

export default function CategoryCreate({ onCreated }) {
    const [nameCategory, setName] = useState('');
    const [description, setdescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nameCategory.trim()) {
            toast.error("Category name is required.");
            return;
        }
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('nameCategory', nameCategory);
            formData.append('description', description);
            const response = await axios.post("/category", formData, {
                headers: { 'Content-Type': "multipart/form-data" },
            });
            toast.success(response.data.message || "Category created successfully.");
            if (onCreated && response.data.category) {
                onCreated(response.data.category);
            }
            setName('');
            setdescription('');
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to create category.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='card'>
                <div className='card-body'>
                    <h4 className='text-primary'>New Category</h4>
                    <br />
                    Name: <input type="text" className='form-control'
                        value={nameCategory} onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    Description: <textarea cols="30" rows="5" className='form-control'
                        value={description} onChange={(e) => setdescription(e.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-success" disabled={submitting}>
                        {submitting ? "Adding..." : "Add"}
                    </button>
                </div>
            </div>
        </form>
    );
}
