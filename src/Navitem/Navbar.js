import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InstaContext } from "../Hook/Context/Instacontext";

export default function Navbar() {
  const userState = useContext(InstaContext);
  //console.log(userState)
  let location = useLocation();
  const navigate = useNavigate();
  const Navitems = () => {
    if (userState) {
      return [
        <form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/createpost" role="button">
            <i className="fas fa-plus-square" />
          </Link>
          <Link className="btn btn-primary mx-2" to="/profile" role="button">
            My Profile
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log out
          </button>
        </form>,
      ];
    } else {
      return [
        <form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login" role="button">
            Log In
          </Link>
          <Link className="btn btn-primary mx-2" to="/signin" role="button">
            Sign In
          </Link>
        </form>,
      ];
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-primary bg-body-tertiar"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <i className="fas fa-instagram" />
          <Link className="navbar-brand" to="#">
            Instagram_clone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={userState ? "/" : "/signin"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {Navitems()}
          </div>
        </div>
      </nav>
    </div>
  );
}
