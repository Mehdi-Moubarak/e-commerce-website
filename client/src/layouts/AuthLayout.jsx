import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  return (
    <>
      <div className="site-wrap d-md-flex align-items-stretch">
        <div
          className="bg-img"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div
          className="form-wrap"
          style={{
            height: "100dvh",
          }}
        >
          <div className="form-inner">
            <h1 className="title">{title}</h1>
            <p className="caption mb-4">{caption}</p>
            <Outlet context={{ setImage, setTitle, setCaption }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
