import React, { useContext } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
function NavBar() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
    { name: "Admin", href: "/dashboard" },
  ];

  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <div>
        <nav
          className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark "
          arial-label="Furni navigation bar"
        >
          <div className="container-fluid">
            <NavLink className="navbar-brand " to="/">
              <span>ArtBS</span>
            </NavLink>

            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsFurni">
              <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      key={item.name}
                      to={item.href}
                      // activeClassName="active"
                      className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 nav-link text-decoration-none custom-navbar-nav"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li key="cart">
                  <NavLink className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </NavLink>
                </li>
                <li key="user">
                  {user ? (
                    <NavLink className="nav-link" onClick={logout}>
                      <i className="fa fa-sign-out"></i>
                    </NavLink>
                  ) : (
                    <NavLink className="nav-link" to="/login">
                      <i className="fa-solid fa-user"></i>
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
