import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "TradeX User";

  // Fetch user profile when token is available
  useEffect(() => {
    if (token) {
      axios.get("http://localhost:3002/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setProfile(res.data))
      .catch(() => {});
    }
  }, [token]);

  const getInitials = (name) => {
    if (!name) return "TU";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarGradient = (name) => {
    const colors = [
      ["#4184f3", "#5a95ff"],
      ["#f093fb", "#f5576c"],
      ["#4facfe", "#00f2fe"],
      ["#43e97b", "#38f9d7"],
      ["#fa709a", "#fee140"],
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = colors[Math.abs(hash) % colors.length];
    return `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
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

  const handleProfileClick = () => {
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
    }, 300);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";
  const avatarGradient = getAvatarGradient(username);

  const formatBalance = (val) => {
    if (val === undefined || val === null) return "\u2014";
    return "\u20B9" + Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "***@" + domain;
  };

  const maskBank = (acct) => {
    if (!acct) return "Not linked";
    return "XXXX" + acct.slice(-4);
  };

  return (
    <div className="menu-container">
      <img src="logo.png" alt="TradeX Logo" style={{ width: "40px", marginRight: "1rem" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
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
            <div className="avatar" style={{ background: avatarGradient }}>
              {getInitials(username)}
            </div>
            <p className="username">{username}</p>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown" onMouseDown={(e) => e.stopPropagation()}>
                <div className="dropdown-header">
                  <div className="dropdown-avatar" style={{ background: avatarGradient }}>
                    {getInitials(username)}
                  </div>
                  <div className="dropdown-user-info">
                    <p className="dropdown-name">{profile?.name || username}</p>
                    <p className="dropdown-email">{profile ? maskEmail(profile.email) : ""}</p>
                  </div>
                </div>

                <div className="dropdown-stats">
                  <div className="stat-item">
                    <span className="stat-label">Available Balance</span>
                    <span className="stat-value">{formatBalance(profile?.balance)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Bank Account</span>
                    <span className="stat-value stat-bank">{maskBank(profile?.bankAccount)}</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <Link to="/funds" className="dropdown-link" onClick={() => setIsProfileDropdownOpen(false)}>
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                  <span>Manage Funds</span>
                </Link>
                <Link to="/holdings" className="dropdown-link" onClick={() => setIsProfileDropdownOpen(false)}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>My Holdings</span>
                </Link>
                <Link to="/orders" className="dropdown-link" onClick={() => setIsProfileDropdownOpen(false)}>
                  <i className="fa fa-list" aria-hidden="true"></i>
                  <span>Order History</span>
                </Link>

                <div className="dropdown-divider" />

                <button className="dropdown-link dropdown-logout" onClick={handleLogout}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <span>Logout</span>
                </button>
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
