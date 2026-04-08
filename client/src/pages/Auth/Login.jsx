import React, { useContext, useEffect, useState } from "react";
import "../../style.css";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Login({ image, title, caption }) {
  const { setImage, setTitle, setCaption } = useOutletContext();
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    setImage(image);
    setTitle(title);
    setCaption(caption);
  }, [image, title, caption, setImage, setTitle, setCaption]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      <form className="pt-3" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="info@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              Keep me logged in
            </label>
          </div>
        </div>

        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="mb-2">
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
