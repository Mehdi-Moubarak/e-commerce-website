import React, { useContext, useEffect } from "react";
import "../../style.css";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
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
  //send POST request to laravel
  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
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

        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              Keep me logged in
            </label>
          </div>
          <div>
            <a href="/">Forgot password?</a>
          </div>
        </div>

        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </div>

        <div className="mb-2">
          Don’t have an account?
          <Link to="/signup"> Sign up</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
