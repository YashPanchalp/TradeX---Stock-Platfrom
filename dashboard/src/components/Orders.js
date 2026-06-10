import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setAllOrders(res.data);
    }).catch((error) => {
      console.warn("API request failed.", error);
    });
  }, []);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Mode</th>
                <th>Qty.</th>
                <th>Order Price</th>
                <th>LTP (Current)</th>
                <th>Variation</th>
              </tr>
              {allOrders.map((order, index) => {
                const modeClass = order.mode === "BUY" ? "profit" : "loss";
                // Mock LTP calculation to demonstrate UI behavior since there's no live market feed
                const mockLTP = Number(order.price) * (order.mode === "BUY" ? 1.01 : 0.99); // Mock +1.00% or -1.00%
                const variationPercentage = (((mockLTP - order.price) / order.price) * 100).toFixed(2);
                const variationClass = variationPercentage >= 0 ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td className={modeClass}>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>{Number(order.price).toFixed(2)}</td>
                    <td>{mockLTP.toFixed(2)}</td>
                    <td className={variationClass}>{variationPercentage >= 0 ? "+" : ""}{variationPercentage}%</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;