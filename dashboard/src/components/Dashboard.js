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
      </GeneralContextProvider>
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
          <div style={{ textAlign: "center", padding: "5rem", marginTop: "10%" }}>
            <h2>Please Login to View Your Dashboard</h2>
            <p style={{ color: "gray", marginTop: "10px" }}>Only the live market WatchList is visible to guests.</p>
            <Link to="/login" className="btn btn-primary" style={{ display: "inline-block", marginTop: "20px", textDecoration: "none" }}>Login Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
