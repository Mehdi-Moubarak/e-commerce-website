import React from 'react';
import { useState } from "react";
import { axios } from '../../api';

export default function CategoryCreate(){

    const[nameCategory, setName]= useState('');
    const[description, setdescription]= useState('');
    const[message, setMessage]= useState('');

    const uploadCategory= async()=>{
        const formData= new FormData();
        formData.append('nameCategory', nameCategory);
        formData.append('description', description);
        const responce= await axios.post("/category", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        });

        if(responce)
        {
            setMessage(responce.data.message);
        }
    }


    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadCategory();
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
                    Description: <textarea cols="30" rows="5" className='form-control'
                        value={description} onChange={(e)=>setdescription(e.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-success">Add</button>
                    <p className="text-warning">{message}</p>
                </div>
            </div>

        </form>
    )
}
