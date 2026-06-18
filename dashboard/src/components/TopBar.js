import React, { useState, useEffect } from "react";

import Menu from "./Menu";

const TopBar = () => {
  // Set realistic starting baseline values for NIFTY and SENSEX
  const [nifty, setNifty] = useState({ price: 22124.50, percent: "0.00%", isDown: false });
  const [sensex, setSensex] = useState({ price: 73095.20, percent: "0.00%", isDown: false });

  useEffect(() => {
    const tick = () => {
      setNifty((prev) => {
        const changePercent = (Math.random() * 2 - 1) / 1000;
        const newPrice = prev.price * (1 + changePercent);
        const diff = newPrice - prev.price;
        return {
          price: parseFloat(newPrice.toFixed(2)),
          percent: (Math.abs(changePercent) * 100).toFixed(2) + "%",
          isDown: diff < 0
        };
      });

      setSensex((prev) => {
        const changePercent = (Math.random() * 2 - 1) / 1000;
        const newPrice = prev.price * (1 + changePercent);
        const diff = newPrice - prev.price;
        return {
          price: parseFloat(newPrice.toFixed(2)),
          percent: (Math.abs(changePercent) * 100).toFixed(2) + "%",
          isDown: diff < 0
        };
      });
    };

    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points" style={{ color: nifty.isDown ? "#fa764e" : "#48c237" }}>
            {nifty.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="percent" style={{ color: nifty.isDown ? "#fa764e" : "#48c237" }}>
            {nifty.isDown ? "▼" : "▲"} {nifty.percent}
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points" style={{ color: sensex.isDown ? "#fa764e" : "#48c237" }}>
            {sensex.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="percent" style={{ color: sensex.isDown ? "#fa764e" : "#48c237" }}>
            {sensex.isDown ? "▼" : "▲"} {sensex.percent}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
