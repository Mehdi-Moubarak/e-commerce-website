import React from 'react';

import { useState  , useEffect } from "react";
import { NavLink } from 'react-router-dom';

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductCreate(){
    const [catname, setCategoryname] = useState({ value: "", label: "" });
    

    const selectOptions = async () => {
        axios.post("http://127.0.0.1:8000/api/category").then((response) => {
          //   console.log("risposta:",response.data)
          setCategoryname(
            response.data.map((risp) => ({
              ...setCategoryname,
              value: risp.value,
              label: risp.label,
            })),
          );
        });
      };
   
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
        console.log(fileimage)
        const formData= new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('stock',stock);
        formData.append('price',price);
        formData.append('evaluation',evaluation);
        formData.append('category',category);
        formData.append('image', fileimage);
        const responce= await axios.post("http://127.0.0.1:8000/api/products", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
 
        if(responce)
        {
            console.log(responce)
            setMessage(responce.message); //"message": "Product successfully created."
            setTimeout(()=>{
                navigate('/productlist');
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
                    <label  className="col-sm-3">Price </label>
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

                    {/* <Select
                        options={portate}
                        onChange={(e) => setAddMenu({ ...addMenu, portataMenuReg: e.target.value })}
                        className="mb-3"
                    /> */}

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