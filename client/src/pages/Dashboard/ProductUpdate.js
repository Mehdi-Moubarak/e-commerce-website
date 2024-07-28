import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';


export default function ProductUpdate(){
    const [id, setId] = useState();
    const [i, setImage] = useState();
    const [n, setName] = useState();
    const [d, setDescription] = useState();
    const [s, setStock] = useState();
    const [e, setEvaluation] = useState();
    const [c, setCategorie] = useState();
    const [p, setPrice] = useState();


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
            "categorie":"Categorie1",
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
            
            <tr><td colSpan={2}> <img src={props.data.image} /></td>        </tr>
            <tr> <th>idProduct </th>    <td> <input type="text" className='form-control' value={props.data.idProduct} /></td>    </tr>
            <tr> <th>Name</th>           <td><input type="text" className='form-control' value={props.data.name}/></td>         </tr>
            <tr> <th>Description</th>    <td><input type="text" className='form-control' value={props.data.description}/></td>  </tr>
            <tr> <th>Stock</th>          <td><input type="text" className='form-control' value={props.data.stock}/></td>        </tr>
            <tr> <th>Price</th>          <td><input type="text" className='form-control' value={props.data.price}/></td>        </tr>
            <tr> <th>Evaluation</th>     <td><input type="text" className='form-control' value={props.data.evaluation}/></td>   </tr>
            <tr> <th>Categorie</th>      <td><input type="text" className='form-control' value={props.data.categorie}/></td>    </tr>
            <tr> <th>Seller</th>         <td><input type="text" className='form-control' value={props.data.seller}/></td>       </tr>
            <tr> <td colSpan={2} className='text-center'>
                <NavLink  to="/productList" className="btn btn-outline-warning" style={{width: '200px'}}>Back</NavLink>
                </td>
            </tr>

                
        </table> 
       
    );
};