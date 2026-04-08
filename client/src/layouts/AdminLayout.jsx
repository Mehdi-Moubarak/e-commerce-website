import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/authContext";
import "../AdminApp.css";

const AdminLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default AdminLayout;
