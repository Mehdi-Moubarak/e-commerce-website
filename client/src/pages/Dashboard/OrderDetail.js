import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';



export default function OrderDetail(){

    const [data , setData] = useState(
    [
        {
            "idOrder":"1",
            "DateOrder":"14-5-3456",
            "TotalPrice":"200,00",
            "Status":"onProcess",
            "CustomerId": 12654,
            "Payement":"On Delivery",
            "DetailOrderId":"12",
            "products":[
                {"idproduit":"1","Quantity":"3"},
                {"idproduit":"2","Quantity":"5"},
                {"idproduit":"3","Quantity":"6"},
            ]  
        },
        
    ]
    )
    
    return(
        <div className="container">
            <div className='row'>
                <h1 className='text-primary'>Order Detail</h1>
                <br />
            
            {
                data && data.map((obj) =>(
                <List data={obj} /> 
                ))
            }
            </div>
            
        </div>
    )
}

const List = (props) => {
    return (
            <table className="table table-sm table-bordered" >
               
               
                    <tr><th>Id</th> <td>{props.data.idOrder}</td></tr>
                    <tr><th>DateOrder</th><td>{props.data.DateOrder}</td></tr>
                    <tr><th>TotalPrice</th><td>{props.data.TotalPrice}</td></tr>
                    <tr><th>Status</th><td>{props.data.Status}</td></tr>
                    <tr><th>CustomerId</th><td>{props.data.CustomerId}</td></tr>
                    <tr><th>Payement</th> <td>{props.data.Payement}</td></tr>
                    <tr><th>DetailOrderId</th> <td>{props.data.DetailOrderId}</td></tr>
                    <tr>
                        <th>Product</th> 
                        <table className="table table-sm table-bordered">
                            <tr> <th>Id Product</th> <th>How many</th></tr>
                            <tr> <td>idproduit</td> <td>{props.data.products[0].idproduit}</td></tr>
                            <tr><td>idproduit</td> <td>{props.data.products[1].idproduit}</td></tr>
                            <tr>  <td>idproduit</td> <td>{props.data.products[2].idproduit}</td></tr>
                        
                        </table>
                    </tr>
                       
               
                    <tr> <td colSpan={2}>
                    <NavLink  to="/Order" className="btn btn-outline-success">Back</NavLink>&nbsp;
                    </td>
                </tr>
                
       </table> 
    );
};

