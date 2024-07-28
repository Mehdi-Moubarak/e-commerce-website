import React from 'react';
import axios from "axios";
import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';


export default function ProductList(){
    const[product, setProduct]= useState([]);
     
    useEffect( ()=>{
        const getProduct= ()=>{
            fetch("http://127.0.0.1:8000/api/products")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.products)
                setProduct(response.products)
            })
            .catch(error=>{ console.log(error)});
        }
        getProduct();
    },[]);
  
    const deleteProduct = (id) => {
        axios.delete('http://127.0.0.1:8000/api/productdelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
    
    return(
        <div className="container">
            
            <div className="row">
            
                <h1>Product List</h1>
                <div className='row'>
                        <div className='col-9'>
                            <NavLink  to="/productCreate" className="btn btn-outline-success">New Product</NavLink>
                        </div>
                        <div className='col-2'>
                            <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                        </div>
                    </div>
                <div>
                
                </div>
               <br />
                <div className="input-group mb-3">
                    <select name="" id="select">
                        <option value="DateProduct">Date</option>
                        <option value="idOrder">Order ID</option>
                        <option value="idCustomer">Customer ID</option>
                        <option value="Status">Status</option>
                    </select>
                    <input type="text" name="" id="filter" placeholder=' Enter ....'/>
                    <button class="btn btn-outline-primary" type="button" id='filterBtn'>Button</button>
                </div> 
            <div>
                <table className="table table-sm table-bordered" >
                    <thead>
                       
                        <th >Id </th>
                        <th >Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Evaluation</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            product.map((pdata, index)=>(
                                <tr key={index}>
                                    <td>{pdata.id} </td>
                                    <td><img src={`http://127.0.0.1:8000/storage/${pdata.image}`} alt="" height={50} width={90}/></td>
                                    <td>{pdata.name} </td>
                                    <td>{pdata.description} </td>
                                    <td>{pdata.stock} </td>
                                    <td>{pdata.price} </td>
                                    <td>{pdata.evaluation} </td>
                                    <td>{pdata.category} </td>
                                    <td>
                                    <NavLink  to="/productView" className="btn btn-outline-success">View</NavLink>&nbsp;
                                    <NavLink  to="/productUpdate" className="btn btn-outline-success">Update</NavLink>&nbsp;
                                    <button onClick={() => deleteProduct(pdata.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                </table>
            </div>
            </div>
        </div>
        
    )
};

