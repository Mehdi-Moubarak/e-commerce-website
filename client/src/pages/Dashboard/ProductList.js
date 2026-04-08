import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { axios, STORAGE_URL } from '../../api';
import { toast } from 'react-toastify';

export default function ProductList() {
    const [product, setProduct] = useState([]);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        axios.get("/products")
            .then(response => {
                setProduct(response.data.products.data || response.data.products);
            })
            .catch(error => { console.log(error) });
    }, []);

    const deleteProduct = (id) => {
        axios.delete('/productdelete/' + id).then(() => {
            toast.success("Product deleted successfully.");
            setProduct(prev => prev.filter(p => p.id !== id));
            setConfirmId(null);
        }).catch(() => {
            toast.error("Failed to delete product.");
            setConfirmId(null);
        });
    };

    return (
        <div className="container">
            <div className="row">
                <h1>Product List</h1>
                <div className='row'>
                    <div className='col-9'>
                        <NavLink to="/productCreate" className="btn btn-outline-success">New Product</NavLink>
                    </div>
                    <div className='col-2'>
                        <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                    </div>
                </div>
                <br />
                <div className="input-group mb-3">
                    <select name="" id="select">
                        <option value="DateProduct">Date</option>
                        <option value="idOrder">Order ID</option>
                        <option value="idCustomer">Customer ID</option>
                        <option value="Status">Status</option>
                    </select>
                    <input type="text" name="" id="filter" placeholder=' Enter ....' />
                    <button className="btn btn-outline-primary" type="button" id='filterBtn'>Button</button>
                </div>
                <div>
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Evaluation</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((pdata, index) => (
                                <tr key={index}>
                                    <td>{pdata.id}</td>
                                    <td><img src={`${STORAGE_URL}/${pdata.image}`} alt="" height={50} width={90} /></td>
                                    <td>{pdata.name}</td>
                                    <td>{pdata.description}</td>
                                    <td>{pdata.stock}</td>
                                    <td>{pdata.price}</td>
                                    <td>{pdata.evaluation}</td>
                                    <td>{pdata.category}</td>
                                    <td>
                                        <NavLink to="/productView" className="btn btn-outline-success btn-sm me-1">View</NavLink>
                                        <NavLink to="/productUpdate" className="btn btn-outline-primary btn-sm me-1">Update</NavLink>
                                        {confirmId === pdata.id ? (
                                            <>
                                                <span className="me-1 text-danger small fw-bold">Sure?</span>
                                                <button onClick={() => deleteProduct(pdata.id)} className="btn btn-danger btn-sm me-1">Yes</button>
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
    );
}
