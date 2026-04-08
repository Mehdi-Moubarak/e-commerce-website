import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "60vh", padding: "60px 20px" }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: "700", color: "#3b5d50" }}>404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <NavLink to="/" className="btn btn-primary px-4 py-2">
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
