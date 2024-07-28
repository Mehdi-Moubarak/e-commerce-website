import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';



export default function ProductList(){

    const [data , setData] = useState(
    [
        {
            
            "idOrder":"1",
            "DateOrder":"14-5-3456",
            "TotalPrice":"200,00",
            "Status":"onProcess",
            "IdCustomer":12654,
            "Payement":"On Delivery",
            "DetailsID":"123",
        },
        {
            
            "idOrder":"1",
            "DateOrder":"14-5-3456",
            "TotalPrice":"200,00",
            "Status":"onProcess",
            "CustomerID":"12654",
            "Payement":"On Delivery",
            "DetailsID":"123",
        },
        {
            
            "idOrder":"1",
            "DateOrder":"14-5-3456",
            "TotalPrice":"200,00",
            "Status":"onProcess",
            "CustomerID":"12654",
            "Payement":"On Delivery",
            "DetailsID":"123",
        },
        
    ]
    )
    
    return(
        <div className="container">
            
            <div className="row">
                <h1>Order List</h1>
            <br />
                <div className="input-group mb-3">
                    <select name="" id="select">
                        <option value="DateOrder">Date</option>
                        <option value="idOrder">Order ID</option>
                        <option value="idCustomer">Customer ID</option>
                        <option value="Status">Status</option>
                    </select>
                    <input type="text" name="" id="filter" placeholder=' Enter ....'/>
                    <button class="btn btn-outline-primary" type="button" id='filterBtn'>Button</button>
                </div>
            <div>
                <br />
                <table className="table table-sm table-bordered" >
                    <thead>
                        <th></th>
                        <th>Id</th>
                        <th>DateOrder</th>
                        <th>TotalPrice</th>
                        <th>Status</th>
                        <th>CustomerId</th>
                        <th>Payement</th>
                        <th>Actions</th>
                    </thead>
                    {
                        data && data.map((obj) =>(
                           <List data={obj} /> 
                        ))
                    }
                </table>
                &nbsp;<input type="checkbox" name="cc" id="cc" />&nbsp;
                    <label htmlFor="cc"> tout</label>&nbsp;
                    <button type="button" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        
    )
}

const List = (props) => {
    return (
            <tr>
                <th><input type="checkbox" name="" id="" /></th>
                <td>{props.data.idOrder}</td>
                <td>{props.data.DateOrder}</td>
                <td>{props.data.TotalPrice}</td>
                <td>{props.data.Status}</td>
                <td>{props.data.CustomerID}</td>
                <td>{props.data.Payement}</td>
                
                <td>
                    <NavLink  to="/orderDetail" className="btn btn-outline-info" >Detail</NavLink>&nbsp;
                    <button  className="btn btn-outline-warning" >Update</button>&nbsp;
                    <button  className="btn btn-outline-danger" >Delete</button>&nbsp;
                    
                </td>
            </tr>
       
    );
};

