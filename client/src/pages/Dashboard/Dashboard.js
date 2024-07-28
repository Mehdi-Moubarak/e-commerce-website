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
                    <div class="card text-white bg-danger mb-3" style={{width: '18rem'}}>
                        <div class="card-header">Header</div>
                        <div class="card-body">
                            <h5 class="card-title">Danger card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div class="card text-white bg-warning mb-3" style={{width: '18rem'}}>
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Danger card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div class="card text-white bg-info mb-3" style={{width: '18rem'}}>
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Danger card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

