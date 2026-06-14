import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const username = localStorage.getItem("username") || "User";
  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const context = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3002/funds", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBalance(res.data.balance))
    .catch(err => console.warn(err));

    axios.get("http://localhost:3002/allHoldings", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setHoldings(res.data))
    .catch(err => console.warn(err));
  }, [context.refreshTrigger]);

  // Live ticking effect for Summary holdings
  useEffect(() => {
    const tick = () => {
      setHoldings((prevHoldings) =>
        prevHoldings.map((stock) => {
          const changePercent = (Math.random() * 2 - 1) / 1000;
          const newPrice = stock.price * (1 + changePercent);
          return { ...stock, price: parseFloat(newPrice.toFixed(2)) };
        })
      );
    };
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, []);

  let totalInvestment = 0;
  let currentVal = 0;
  holdings.forEach(stock => {
    totalInvestment += stock.avg * stock.qty;
    currentVal += stock.price * stock.qty;
  });
  const pnl = currentVal - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;
  const usedMargin = totalInvestment * 1.15;
  const availableMargin = balance - usedMargin;

  return (
    <>
      <div className="username p-5 m-5">
        <h6>Hello , {username} ! </h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{availableMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{usedMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"} style={pnl < 0 ? { color: "#fa764e", WebkitTextFillColor: "#fa764e" } : {}}>
              ₹{Math.abs(pnl).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <small style={pnl < 0 ? { color: "#fa764e" } : {}}>{pnl >= 0 ? "+" : ""}{pnlPercentage.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{currentVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>{" "}
            </p>
            <p>
              Investment <span>₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
