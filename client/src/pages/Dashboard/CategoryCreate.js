import React from 'react';

import { useState  , useEffect } from "react";
import axios from "axios";

export default function CategoryCreate(){
   
    const[nameCategory, setName]= useState('');
    const[description, setdescription]= useState('');
    const[message, setMessage]= useState('');
 
    const uploadProduct= async()=>{
        const formData= new FormData();
        formData.append('nameCategory', nameCategory);
        formData.append('description',description);
        const responce= await axios.post("c", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
 
        if(responce)
        {
            console.log(responce)
            setMessage(responce.message); //"message": "Category successfully created."
           
        }
    }
 
    
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadProduct();
 
   }
   
    return(  
        <form onSubmit={ handleSubmit}>  
            <div className='card'>
                <div className='card-body'>
                    <h4 className='text-primary'>New Category</h4>
                    <br />
                    Name: <input  type="text" className='form-control'
                        value={nameCategory} onChange={ (e)=>setName(e.target.value)}
                    />
                    <br />
                    Description: <textarea cols="30" rows="5" type="text" className='form-control'
                        value={description} onChange={(e)=>setdescription(e.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-success">Add</button>
                    <p className="text-warning">{message}</p>
                </div>
            </div>
                
        </form> 
    )
}



