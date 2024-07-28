import React from 'react';
import { useState  , useEffect } from "react";
import axios from "axios";
import CategoryCreate from './CategoryCreate.js'

export default function Categorie(){
    const[category, setCategory]= useState([]);
     
    useEffect( ()=>{
        const getCategory= ()=>{
            fetch("http://127.0.0.1:8000/api/category")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.categories)
                setCategory(response.categories)
            })
            .catch(error=>{ console.log(error)});
        }
        getCategory();
    },[]);
  
    const deleteCategory = (id) => {
        axios.delete('http://127.0.0.1:8000/api/categoryDelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
   

    return(
        
        <div className="container">
            <div className='row'>
                <h1>Category Page</h1>
                <div className='col-lg-7 col-md-12' style={{marginTop:'10px'}}>
                <div className='card'>
                    <div className='card-body'>
                    <div className='row'>
                        <div className='col-9'>
                            <h3 className='text-primary'>Categories List</h3>
                        </div>
                        <div className='col-2'>
                            <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                        </div>
                    </div>
                    <br />
                    <table className="table table-sm table-bordered text-center">
                        <thead>
                        <tr >
                            <th className='text-center'>Id </th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            category.map((pdata, index)=>(
                                <tr key={index}>
                                <td>{pdata.id } </td>
                                <td>{pdata.nameCategory } </td>
                                <td>{pdata.description } </td>
                                <td>
                                <button onClick={() => deleteCategory(pdata.id)} className="btn btn-danger">Delete</button>
                                </td>
                                </tr>
                            ))
                        }
                        </tbody>
                        
                    </table>
                    
                    </div>
                </div>
            </div>
            
            <div className='col-lg-5 col-md-12' style={{marginTop:'10px'}}>
            <CategoryCreate />
            </div>
        </div>
    </div>
        
    )
}



