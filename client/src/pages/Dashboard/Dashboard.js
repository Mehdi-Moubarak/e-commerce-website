import React from 'react';

export default function Dashboard() {
    return (
        <div>
            <div className='row'>
                <div>
                    <h1>Dashboard</h1>
                    <br />
                </div>

                <div className='col-md-4'>
                    <div className="card text-white bg-danger mb-3" style={{ width: '18rem' }}>
                        <div className="card-header">Products</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Products</h5>
                            <p className="card-text">View, create, update and delete products from your store.</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className="card text-white bg-warning mb-3" style={{ width: '18rem' }}>
                        <div className="card-header">Orders</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Orders</h5>
                            <p className="card-text">Track and manage customer orders and payments.</p>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className="card text-white bg-info mb-3" style={{ width: '18rem' }}>
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Categories</h5>
                            <p className="card-text">Organise your products into categories.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
