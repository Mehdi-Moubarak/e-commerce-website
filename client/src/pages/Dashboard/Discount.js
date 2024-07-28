import React from 'react';
import { useState  , useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default function Discount()  {

  const[discount, setDiscount]= useState([]);
     
  useEffect( ()=>{
      const getDiscount= ()=>{
          fetch("http://127.0.0.1:8000/api/discounts")
          .then(res=>{ return res.json()})
          .then(response=>{ 
              console.log(response.discounts)
              setDiscount(response.discounts)
          })
          .catch(error=>{ console.log(error)});
      }
      getDiscount();
  },[]);

  const deleteDiscount = (id) => {
      axios.delete('http://127.0.0.1:8000/api/discountDelete/'+id).then(function(response){
          console.log(response.data);
          alert("Successfully Deleted");
      });
  }


  return (
    <div className="container">
            <div className='row'>
                <h1>Discount Page</h1>
                <div className='' style={{marginTop:'10px'}}>
                <div className='card'>
                    <div className='card-body'>
                    <div className='row'>
                      <div className='col-8'>
                        <h3 className='text-primary'>Discounts List</h3>
                      </div>
                      <div className='col-4'>
                        <NavLink  to="/DiscountCreate" className="btn btn-outline-success">+ New</NavLink>&nbsp;
                        <button onClick={() => window.location.reload()} className='btn btn-primary'>Refresh</button>
                      </div>
                    </div>
                    <br />
                    
                    <table className="table table-sm table-bordered">
                        <thead>
                        <tr>
                            <th>Id </th>
                            <th>Label</th>
                            <th>Value</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            discount.map((pdata, index)=>(
                                <tr>
                                <td>{pdata.id } </td>
                                <td>{pdata.label } </td>
                                <td>{pdata.value } </td>
                                <td>{pdata.created_at } </td>
                                <td>{pdata.updated_at } </td>
                      
                                <td>
                                <button onClick={() => deleteDiscount(pdata.id)} className="btn btn-success">Delete</button>
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

