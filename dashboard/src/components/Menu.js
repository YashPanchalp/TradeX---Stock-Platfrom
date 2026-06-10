import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // THEME-TOGGLE-STATE-START (copilot-marker)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem("tradex-theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    const themeName = isDarkTheme ? "dark" : "light";
    document.body.dataset.theme = themeName;
    localStorage.setItem("tradex-theme", themeName);
  }, [isDarkTheme]);
  // THEME-TOGGLE-STATE-END (copilot-marker)

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div 
          className="profile" 
          onClick={handleProfileClick}
          onMouseEnter={() => setIsProfileDropdownOpen(true)}
          onMouseLeave={() => setIsProfileDropdownOpen(false)}
        >
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <Link to="/login" onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsProfileDropdownOpen(false)}>Signup</Link>
              <hr />
              <Link to="#" onClick={() => {
                setIsProfileDropdownOpen(false);
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}>Logout</Link>
            </div>
          )}
        </div>
        {/* THEME-TOGGLE-START (copilot-marker) */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setIsDarkTheme((c) => !c)}
          aria-label="Toggle dark mode"
        >
          <i className={`fa ${isDarkTheme ? 'fa-sun-o' : 'fa-moon-o'}`}></i>
          <span>{isDarkTheme ? 'Light' : 'Dark'}</span>
        </button>
        {/* THEME-TOGGLE-END (copilot-marker) */}
      </div>
    </div>
  );
};

export default Menu;
