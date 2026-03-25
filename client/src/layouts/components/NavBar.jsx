import React, { useContext } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header>
      <div>
        <nav
          className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
          aria-label="Furni navigation bar"
        >
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <span>ArtBS</span>
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsFurni"
              aria-controls="navbarsFurni"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsFurni">
              <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) =>
                        `nav-link text-decoration-none${isActive ? " active" : ""}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                {user && user.role === "admin" && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `nav-link text-decoration-none${isActive ? " active" : ""}`
                      }
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <NavLink className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </NavLink>
                </li>
                <li>
                  {user ? (
                    <button
                      className="nav-link btn btn-link"
                      style={{ color: "inherit", background: "none", border: "none", padding: "0.5rem" }}
                      onClick={logout}
                    >
                      <i className="fa fa-sign-out"></i>
                    </button>
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
