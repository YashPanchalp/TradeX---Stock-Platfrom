import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "TradeX User";

  const getInitials = (name) => {
    if (!name) return "TU";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // THEME-TOGGLE-STATE-START (copilot-marker)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem("tradex-theme");
    return saved ? saved === "dark" : true;
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

  const handleProfileMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 300); // 300ms delay before dropdown closes
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="TradeX Logo" style={{ width: "40px", marginRight: "1rem" }} />
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
        {token ? (
          <div 
            className="profile" 
            onClick={handleProfileClick}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <div className="avatar">{getInitials(username)}</div>
            <p className="username">{username}</p>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <Link to="#" onClick={() => {
                  setIsProfileDropdownOpen(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  window.location.href = "/login";
                }}>Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="profile">
            <Link to="/login" className="btn btn-blue" style={{ textDecoration: "none", padding: "0.4rem 1rem", fontSize: "0.85rem", borderRadius: "4px" }}>Login / Signup</Link>
          </div>
        )}
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
