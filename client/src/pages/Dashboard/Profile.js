import React from 'react';

import { useState  , useEffect } from "react";
import axios from "axios";


export default function Profile(){
    

    const[user, setUser]= useState([]);
     
    useEffect( ()=>{
        const getUser= ()=>{
            fetch("http://127.0.0.1:8000/api/users")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.user)
                setUser(response.user)
            })
            .catch(error=>{ console.log(error)});
        }
        getUser();
    },[]);
  
    const deleteUser = (id) => {
        axios.delete('http://127.0.0.1:8000/api/userdelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
        



        return(
            <div className="container">
                
                <div className="row">
                    <h1>Customer Profile</h1>
                <br />
                <div className='card'>
                    <div className='card-body'>

                    <div className='row'>
                        <div className='col-10'>
                            <div className="input-group mb-3">
                                <select name="" id="select">
                                    <option value="username">Username</option>
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
                    <table id="dtHorizontalExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%" >
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>Action</th></tr>
                        </thead>
                        <tbody>
                        {
                            user?.map((pdata, index)=>(
                                <tr>
                                    <td>{pdata.id } </td>
                                    <td>{pdata.first_name } </td>
                                    <td>{pdata.last_name } </td>
                                    <td>{pdata.email } </td>
                                    <td>{pdata.password }</td>
                                    <td>{pdata.address } </td>
                                    <td>{pdata.phone } </td>
                                    <td>{pdata.role } </td>
                                    <td>{pdata.created_at } </td>
                                    <td>{pdata.updated_at } </td>
                                    <td>
                                    <button onClick={() => deleteUser(pdata.id)} className="btn btn-success">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    </div>
                    </div> 
                </div>
                </div>
            </div>  
            
                  
    )
}

