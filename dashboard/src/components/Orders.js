import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const context = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/allOrders`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setAllOrders(res.data);
    }).catch((error) => {
      console.warn("API request failed.", error);
    });
  }, [context.refreshTrigger]);

  // Live ticking effect for Orders
  useEffect(() => {
    const tick = () => {
      setAllOrders((prevOrders) =>
        prevOrders.map((order) => {
          const currentLtp = order.ltp || order.price;
          // Random change between -0.10% and +0.10%
          const changePercent = (Math.random() * 2 - 1) / 1000;
          const newLtp = currentLtp * (1 + changePercent);
          return {
            ...order,
            ltp: parseFloat(newLtp.toFixed(2)),
          };
        })
      );
    };
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
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
                const currentLTP = order.ltp || order.price;
                const variationPercentage = (((currentLTP - order.price) / order.price) * 100).toFixed(2);
                const variationClass = variationPercentage >= 0 ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td className={modeClass}>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>{Number(order.price).toFixed(2)}</td>
                    <td>{Number(currentLTP).toFixed(2)}</td>
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