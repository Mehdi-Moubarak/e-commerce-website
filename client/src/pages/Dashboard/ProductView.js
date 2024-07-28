import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';


export default function ProductView(){

    const [data , setData] = useState(
    [
        {
            "idProduct":"1",
            "image":"./img/bg9",
            "name":"name1",
            "description": "description",
            "stock":"15",
            "price":"16.5",
            "evaluation":"4.8",
            "category":"Category",
        }
    ]
    )
    
    return(
        <div className="container">
            
            <div className="row">
            
                <h1>Product View</h1>
               <br />
                 
            <div>
            {
                data && data.map((obj) =>(
                    <List data={obj} /> 
                ))
            }
            </div>
            </div>
        </div>
        
    )
}

const List = (props) => {
    return ( 
        <table className="table table-sm table-bordered" >
            
            <tr><td colSpan={2}><img src={props.data.image} /></td>        </tr>
            <tr> <th>idProduct </th>     <td>{props.data.idProduct}</td>    </tr>
            <tr> <th>Name</th>           <td>{props.data.name}</td>         </tr>
            <tr> <th>Description</th>    <td>{props.data.description}</td>  </tr>
            <tr> <th>Stock</th>          <td>{props.data.stock}</td>        </tr>
            <tr> <th>Price</th>          <td>{props.data.price}</td>        </tr>
            <tr> <th>Evaluation</th>     <td>{props.data.evaluation}</td>   </tr>
            <tr> <th>Categorie</th>      <td>{props.data.categorie}</td>    </tr>
            <tr> <td colSpan={2} className='text-center'>
                <NavLink  to="/productList" className="btn btn-outline-success" style={{width: '200px'}}>Back</NavLink>
                </td>
            </tr>

                
        </table> 
       
    );
};

