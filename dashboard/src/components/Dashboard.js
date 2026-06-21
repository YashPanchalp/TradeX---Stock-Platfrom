import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
        <div className="content">
          {token ? (
            <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
            </Routes>
          ) : (
            <div className="guest-view">
              <div className="guest-card">
                <div className="guest-icon">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </div>
                <h2 className="guest-title">Please Login to View Your Dashboard</h2>
                <p className="guest-desc">Only the live market WatchList is visible to guests.</p>
                <Link to="/login" className="btn btn-guest">Login Now</Link>
              </div>
            </div>
          )}
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;
