import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('tradex-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const themeName = isDarkTheme ? 'dark' : 'light';
    document.body.dataset.theme = themeName;
    localStorage.setItem('tradex-theme', themeName);
  }, [isDarkTheme]);

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom p-2"
      style={{ backgroundColor: "var(--page-surface)", color: "var(--page-text)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            alt="logo"
            style={{ width: "125px" }}
          />
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
          <form className="d-flex ms-auto align-items-center gap-3 flex-column flex-lg-row" role="search">
            <ul className="navbar-nav mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsDarkTheme((current) => !current)}
              aria-label="Toggle dark mode"
            >
              <i className={`fa ${isDarkTheme ? 'fa-sun-o' : 'fa-moon-o'}`}></i>
              <span>{isDarkTheme ? 'Light' : 'Dark'}</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
