import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";

export default function Comment(){
    const[comment, setComment]= useState([]);
     
    useEffect( ()=>{
        const getComment= ()=>{
            fetch("http://127.0.0.1:8000/api/comments")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.comments)
                setComment(response.comments)
            })
            .catch(error=>{ console.log(error)});
        }
        getComment();
    },[]);
  
    const deleteComment = (id) => {
        axios.delete('http://127.0.0.1:8000/api/commentsDelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
    
    
    return(
        
        <div className="container">
             
            <div className="row">
                <h1>Comments List</h1>
                <div className='card'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-10'>
                            <div className="input-group mb-3">
                                <select name="" id="select">
                                    <option value="DateOrder">Date</option>
                                    <option value="idOrder">Product</option>
                                    <option value="idCustomer">User</option>
                                    <option value="Status">ID</option>
                                </select>
                                <input type="text" name="" id="filter" placeholder=' Enter ....'/>
                                <button class="btn btn-outline-primary" type="button" id='filterBtn'>Button</button>
                            </div>
                        </div> 
                        <div className='col-2'>
                            <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                        </div> 
                    </div>

            <div>
            <br />
           
                <table className="table table-sm table-bordered" >
                    <thead>
                        <th >Id </th>
                        <th >Label</th>
                        <th style={{width: '100px'}}>User</th>
                        <th>Product</th>
                        <th>created_at</th>
                        <th>updated_at</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            comment.map((pdata, index)=>(
                                <tr>
                                <td>{pdata.id } </td>
                                <td>{pdata.label } </td>
                                <td>{pdata.user.first_name } {pdata.user.last_name } </td>
                                <td>{pdata.product.name } </td>
                                <td>{pdata.created_at } </td>
                                <td>{pdata.updated_at } </td>
                                <td>
                                <button onClick={() => deleteComment(pdata.id)} className="btn btn-success">Delete</button>
                                </td>
                                </tr>
                            ))
                        }
                        </tbody>
                </table>
                </div></div>
            </div>
            </div>
        </div>
    )
}


