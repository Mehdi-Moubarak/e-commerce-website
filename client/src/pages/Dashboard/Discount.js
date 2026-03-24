import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { axios } from '../../api';

export default function Discount()  {

  const[discount, setDiscount]= useState([]);

  useEffect( ()=>{
      axios.get("/discounts")
          .then(response => {
              setDiscount(response.data.discounts.data || response.data.discounts);
          })
          .catch(error => { console.log(error) });
  },[]);

  const deleteDiscount = (id) => {
      axios.delete('/discountDelete/'+id).then(function(response){
          console.log(response.data);
          alert("Successfully Deleted");
          setDiscount(discount.filter(d => d.id !== id));
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
                                <tr key={index}>
                                <td>{pdata.id } </td>
                                <td>{pdata.label } </td>
                                <td>{pdata.value } </td>
                                <td>{pdata.created_at } </td>
                                <td>{pdata.updated_at } </td>

                                <td>
                                <button onClick={() => deleteDiscount(pdata.id)} className="btn btn-danger">Delete</button>
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
