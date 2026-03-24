import React, { useEffect } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const SignUp = ({ image, title, caption }) => {
  const { setImage, setTitle, setCaption } = useOutletContext();
  const { register, user } = useContext(AuthContext);

  useEffect(() => {
    setImage(image);
    setTitle(title);
    setCaption(caption);
  }, [setImage, image, setTitle, title, setCaption, caption]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function changeData(event) {
    setFormData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password,
    };

    register(data);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form action="#" className="pt-3" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={changeData}
            name="first_name"
          />
          <label htmlFor="first_name">First Name</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={changeData}
            name="last_name"
          />
          <label htmlFor="last_name">Last Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="info@example.com"
            value={formData.email}
            onChange={changeData}
            name="email"
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeData}
            name="password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              I agree to the <a href="/">Terms of Service</a> and{" "}
              <a href="/">Privacy Policy</a>
            </label>
          </div>
        </div>

        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-primary">
            Create an account
          </button>
        </div>

        <div className="mb-2">
          Already a member?
          <Link to="/login"> Log in</Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
