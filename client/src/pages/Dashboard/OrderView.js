import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';



export default function OrderView(){

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
            "idDetailOrder":"12",
            "products":[
                {"idproduit":"1","Quantity":"3"},
                {"idproduit":"2","Quantity":"5"},
                {"idproduit":"3","Quantity":"6"},
                {"idproduit":"4","Quantity":"1"},
                {"idproduit":"5","Quantity":"7"},
            ]  
        }
    ]
    )
    
    return(
        <div className="container">
            <div className="row"><h1>View Order</h1>
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
            
                <th></th>
                <tr><th>Id</th><td>{props.data.idOrder}</td> </tr>
                <tr><th>DateOrder</th><td><img src={props.data.DateOrder} /></td></tr>
                <tr><th>TotalPrice</th><td>{props.data.TotalPrice}</td></tr>
                <tr><th>Status</th> <td>{props.data.Status}</td></tr>
                <tr><th>CustomerId</th><td>{props.data.CustomerID}</td></tr>
                <tr><th>Payement</th> <td>{props.data.Payement}</td></tr>
                
           
            <tr>
                <td colSpan={2} className='text-center'>
                    <NavLink  to="/Order" className="btn btn-outline-success" style={{width: '200px'}}>Back</NavLink>&nbsp;
                    
                    
                </td>
            </tr>
            </table>
                
               
                
       
    );
};

