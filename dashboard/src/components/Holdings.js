import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState(holdings);
  const context = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3002/allHoldings", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      // console.log(res.data);
      setAllHoldings(res.data);
    }).catch((error) => {
      console.warn("Using local holdings data because the API request failed.", error);
      setAllHoldings(holdings);
    });
  }, [context.refreshTrigger]);

  // Live ticking effect for Holdings
  useEffect(() => {
    const tick = () => {
      setAllHoldings((prevHoldings) =>
        prevHoldings.map((stock) => {
          // Random change between -0.10% and +0.10%
          const changePercent = (Math.random() * 2 - 1) / 1000;
          const newPrice = stock.price * (1 + changePercent);
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
          };
        })
      );
    };
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  let totalInvestment = 0;
  let totalCurrentValue = 0;
  allHoldings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    totalCurrentValue += stock.price * stock.qty;
  });
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Action</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0;
            const profClass = isProfit ? "profit" : "loss";
            const pctChangeValue = ((stock.price - stock.avg) / stock.avg) * 100;
            const isDown = pctChangeValue < 0;
            const percent = Math.abs(pctChangeValue).toFixed(2) + "%";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>
                  {pctChangeValue >= 0 ? "+" : ""}{pctChangeValue.toFixed(2)}%
                </td>
                <td>
                  <button 
                    style={{ background: "#fa764e", color: "#fff", border: "none", padding: "0.3rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "500", transition: "all 0.2s" }}
                    onClick={() => context.openBuyWindow(stock.name, stock.price, "SELL", stock.qty, isDown, percent)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL.toLocaleString("en-IN", { maximumFractionDigits: 2 })} ({totalPnL >= 0 ? "+" : ""}{totalPnLPercentage.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
