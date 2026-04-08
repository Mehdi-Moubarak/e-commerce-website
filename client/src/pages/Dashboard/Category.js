import React from 'react';
import { useState, useEffect } from "react";
import { axios } from '../../api';
import CategoryCreate from './CategoryCreate.js';
import { toast } from 'react-toastify';

export default function Categorie() {
    const [category, setCategory] = useState([]);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        axios.get("/category")
            .then(response => {
                setCategory(response.data.categories);
            })
            .catch(error => { console.log(error) });
    }, []);

    const deleteCategory = (id) => {
        axios.delete('/categoryDelete/' + id).then(() => {
            toast.success("Category deleted successfully.");
            setCategory(prev => prev.filter(c => c.id !== id));
            setConfirmId(null);
        }).catch(() => {
            toast.error("Failed to delete category.");
            setConfirmId(null);
        });
    };

    return (
        <div className="container">
            <div className='row'>
                <h1>Category Page</h1>
                <div className='col-lg-7 col-md-12' style={{ marginTop: '10px' }}>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-9'>
                                    <h3 className='text-primary'>Categories List</h3>
                                </div>
                                <div className='col-2'>
                                    <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                                </div>
                            </div>
                            <br />
                            <table className="table table-sm table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th className='text-center'>Id</th>
                                        <th className='text-center'>Name</th>
                                        <th className='text-center'>Description</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((pdata, index) => (
                                        <tr key={index}>
                                            <td>{pdata.id}</td>
                                            <td>{pdata.nameCategory}</td>
                                            <td>{pdata.description}</td>
                                            <td>
                                                {confirmId === pdata.id ? (
                                                    <>
                                                        <span className="me-1 text-danger small fw-bold">Sure?</span>
                                                        <button onClick={() => deleteCategory(pdata.id)} className="btn btn-danger btn-sm me-1">Yes</button>
                                                        <button onClick={() => setConfirmId(null)} className="btn btn-secondary btn-sm">No</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => setConfirmId(pdata.id)} className="btn btn-danger btn-sm">Delete</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='col-lg-5 col-md-12' style={{ marginTop: '10px' }}>
                    <CategoryCreate onCreated={(cat) => setCategory(prev => [...prev, cat])} />
                </div>
            </div>
        </div>
    );
}
