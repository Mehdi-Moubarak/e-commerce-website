import React from 'react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';
import { useNavigate } from "react-router-dom";

export default function ProductCreate(){
    const navigate = useNavigate();

    const[name, setName]= useState('');
    const[description, setDescription]= useState('');
    const[stock, setStock]= useState('');
    const[price, setPrice]= useState('');
    const[evaluation, setEvaluation]= useState('');
    const[category, setCategory]= useState('');
    const[fileimage, setPhoto]= useState('');
    const[message, setMessage]= useState('');

    const uploadProduct= async()=>{
        const formData= new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('stock',stock);
        formData.append('price',price);
        formData.append('evaluation',evaluation);
        formData.append('category',category);
        formData.append('image', fileimage);
        const responce= await axios.post("/products", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        });

        if(responce)
        {
            setMessage(responce.data.message);
            setTimeout(()=>{
                navigate('/productList');
            }, 2000);
        }
    }

    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadProduct();
   }

    return(
    <React.Fragment>
        <div className="container">
            <div className="row">

                <h5 className="mb-4">Add Product </h5>
                <p className="text-warning">{ message}</p>

                    <form onSubmit={ handleSubmit}>
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Product Title </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={ (e)=>setName(e.target.value)}/>
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Description </label>
                    <div className="col-sm-9">
                    <textarea cols="30" rows="5" type="text" className='form-control'
                        value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Stock </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setStock(e.target.value)}  />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Price </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setPrice(e.target.value)}  />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Evaluation </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setEvaluation(e.target.value)}  />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Category </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setCategory(e.target.value)}  />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Product Image</label>
                    <div className="col-sm-9">
                    <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    </div>

                    </form>


            </div>
        </div>
    </React.Fragment>
    );
}
