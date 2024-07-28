import React from 'react';

import Button from 'react-bootstrap/Button';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';



export default function CommentView(){

    const [data , setData] = useState(
        [
            {
                "idComment":"1",
                "Label":"Comment",
                "Product":"ProductName",
                "Customer":"name1",
            }
        ]
        )
    
    return(
        <div className="container">
            <div className="row"><h1>Comment View</h1>
            
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
                <tr><th>Id</th><td>{props.data.idComment}</td> </tr>
                <tr><th>Label</th><td>{props.data.Label}</td></tr>
                <tr><th>Product</th><td>{props.data.Product}</td></tr>
                <tr><th>Customer</th> <td>{props.data.Customer}</td></tr>
                

            <tr>
                <td colSpan={2} className='text-center'>
                    <NavLink  to="/Comment" className="btn btn-outline-success" style={{width: '200px'}}>Back</NavLink>&nbsp;
                    
                    
                </td>
            </tr>
        </table>
                
               
                
       
    );
};

