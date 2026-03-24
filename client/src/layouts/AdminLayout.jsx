import React from 'react'
import Sidebar from '../components/Sidebar'
import "../AdminApp.css";
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AdminLayout