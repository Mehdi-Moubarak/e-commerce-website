import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';

export default function Comment(){
    const[comment, setComment]= useState([]);

    useEffect( ()=>{
        axios.get("/comments")
            .then(response => {
                setComment(response.data.comments.data || response.data.comments);
            })
            .catch(error => { console.log(error) });
    },[]);

    const deleteComment = (id) => {
        axios.delete('/commentsDelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
            setComment(comment.filter(c => c.id !== id));
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
                                <button className="btn btn-outline-primary" type="button" id='filterBtn'>Button</button>
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
                        <tr>
                        <th >Id </th>
                        <th >Label</th>
                        <th style={{width: '100px'}}>User</th>
                        <th>Product</th>
                        <th>created_at</th>
                        <th>updated_at</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comment.map((pdata, index)=>(
                                <tr key={index}>
                                <td>{pdata.id } </td>
                                <td>{pdata.label } </td>
                                <td>{pdata.user?.first_name} {pdata.user?.last_name}</td>
                                <td>{pdata.product?.name}</td>
                                <td>{pdata.created_at } </td>
                                <td>{pdata.updated_at } </td>
                                <td>
                                <button onClick={() => deleteComment(pdata.id)} className="btn btn-danger">Delete</button>
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
