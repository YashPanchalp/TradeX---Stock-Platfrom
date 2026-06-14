import React, { useState, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, currentPrice = 0, actionType = "BUY" }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(currentPrice || 0);
  const isSellMode = actionType === "SELL";
  const primaryActionLabel = isSellMode ? "SELL" : "BUY";
  const primaryActionClass = isSellMode ? "btn-secondary" : "btn-primary";

  // CONNECT WITH THE API ENDPOINT AND PASS DATA TO THE REQ BODY
  const handlePrimaryActionClick = () => {
    if (!stockPrice || stockPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }
    const token = localStorage.getItem("token");
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: primaryActionLabel,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    context.closeBuyWindow();
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  const totalValue = (stockQuantity * stockPrice).toFixed(2);
  const marginRequired = (totalValue * 0.15).toFixed(2); // 15% margin

  return (
    <div className="buy-window-wrapper">
      <div className="buy-window-container">
        {/* Header */}
        <div className="buy-window-header">
          <h2>{uid}</h2>
          <span className="close-btn" onClick={handleCancelClick}>×</span>
        </div>

        <div className="buy-window-content">
          {/* Left Section - Current Price Info */}
          <div className="buy-window-section left-section">
            <div className="price-info-card">
              <h4 className="stock-symbol">{uid}</h4>
              <label className="info-label">Current Price</label>
              <h3 className="current-price">₹{Number(currentPrice).toFixed(2)}</h3>
              <div className="price-details">
                <span className="detail-label">Market Rate</span>
              </div>
            </div>
          </div>

          {/* Center Section - Input Form */}
          <div className="buy-window-section center-section">
            <div className="order-form">
              <div className="form-group">
                <label htmlFor="qty" style={{color:"#4184f3"}}>Quantity</label>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  min="1"
                  onChange={(e) => setStockQuantity(e.target.value)}
                  value={stockQuantity}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price" style={{color:"#4184f3"}}>Price per Unit</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.05"
                  onChange={(e) => setStockPrice(e.target.value)}
                  value={stockPrice}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Summary */}
          <div className="buy-window-section right-section">
            <div className="summary-card">
              <div className="summary-item">
                <span className="label">Total Value</span>
                <span className="value">₹{totalValue}</span>
              </div>
              <div className="summary-item">
                <span className="label">Margin Required (15%)</span>
                <span className="value">₹{marginRequired}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-item highlighted">
                <span className="label">Est. Cost</span>
                <span className="value">₹{totalValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="buy-window-footer">
          <div className="button-group">
            <button className={`btn ${primaryActionClass}`} onClick={handlePrimaryActionClick}>
              {primaryActionLabel}
            </button>
            <button className="btn btn-cancel" onClick={handleCancelClick}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
