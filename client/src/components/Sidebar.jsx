import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaThList,
    FaShopify,
    FaMoneyCheckAlt,
    
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import "../AdminApp.css";


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"dashboard",
            name:"Dashboard",
            icon:<FaRegChartBar/>
        },
        {
            path:"/category",
            name:"Category",
            icon:<FaThList/>
        },
        
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },
        
        {
            path:"/productList",
            name:"Product List",
            icon:<FaTh/>
        },
        {
            path:"/order",
            name:"Order",
            icon:<FaShopify/>
        },
        {
            path:"/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/discount",
            name:"discount",
            icon:<FaMoneyCheckAlt/>
        },
        
    ]
    return (
        <div >
            <div className='row'>
                <div className='col-2'>
                    <div  className="sidebar">
                        <div className="top_section">
                        <NavLink to="/"><h1  className="logo">ArtBS</h1></NavLink>
                            <div  className="bars">
                                <FaBars onClick={toggle}/>
                            </div>
                        </div>
                        {
                            menuItem.map((item, index)=>(
                                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                    <div className="icon">{item.icon}</div>
                                    <div  className="link_text">{item.name}</div>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
                <div className='col-10'>
                    <main><Outlet /></main>
                </div>
            </div>
             
       
        </div>
    );
};

export default Sidebar;