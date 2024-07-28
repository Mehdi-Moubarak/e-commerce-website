import React from 'react';

import { useState  , useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default function DiscountCreate(){

    const[label, setLabel]= useState('');
    const[value, setValue]= useState('');
    const[message, setMessage]= useState('');
 
    const uploadProduct= async()=>{
        const formData= new FormData();
        formData.append('label', label);
        formData.append('value',value);
        const responce= await axios.post("http://127.0.0.1:8000/api/discounts", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
 
        if(responce)
        {
            console.log(responce)
            setMessage(responce.message); //"message": "Discount successfully created."
           
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
                    Label: <input  type="text" className='form-control'
                        value={label} onChange={ (e)=>setLabel(e.target.value)}
                    />
                    <br />
                    Value: <input type="text" className='form-control'
                        value={value} onChange={(e)=>setValue(e.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-success" >Add</button>&nbsp;&nbsp;
                    <NavLink  to="/discount" className="btn btn-outline-success" >Back</NavLink>
                    <p className="text-warning">{message}</p>
                </div>
            </div>
                
        </form> 
    )
}



