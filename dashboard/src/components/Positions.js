import React from "react";

import { positions } from "../data/data";
import { useState } from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Positions = () => {

  const [allPositions, setAllPositions] = useState([]);
  const context = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3002/allPositions", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setAllPositions(res.data);
    }).catch((error) => {
        console.warn("Using local positions data because the API request failed.", error);
        setAllPositions(positions);
        });
  }, [context.refreshTrigger]);

  // Live ticking effect for Positions
  useEffect(() => {
    const tick = () => {
      setAllPositions((prevPositions) =>
        prevPositions.map((stock) => {
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

  const positivePositions = allPositions.filter(stock => (stock.price * stock.qty) - (stock.avg * stock.qty) >= 0);
  const negativePositions = allPositions.filter(stock => (stock.price * stock.qty) - (stock.avg * stock.qty) < 0);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {allPositions.length === 0 ? (
        <div className="no-orders">
          <p>You don't have any open positions</p>
        </div>
      ) : (
        <>
          {positivePositions.length > 0 && (
            <>
              <h4 className="title" style={{ marginTop: "2rem", fontSize: "1.1rem" }}>Positive Positions (In Profit)</h4>
              <div className="order-table">
                <table>
                  <tbody>
                    <tr>
                      <th>Instrument</th>
                      <th>Qty.</th>
                      <th>Buy Price</th>
                      <th>Current Price</th>
                      <th>% Change</th>
                    </tr>

                    {positivePositions.map((stock, index) => {
                      const pctChangeValue = ((stock.price - stock.avg) / stock.avg) * 100;
                      const profClass = "profit";

                      return (
                        <tr key={index}>
                          <td>{stock.name}</td>
                          <td>{stock.qty}</td>
                          <td>{stock.avg.toFixed(2)}</td>
                          <td>{stock.price.toFixed(2)}</td>
                          <td className={profClass}>
                            +{pctChangeValue.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {negativePositions.length > 0 && (
            <>
              <h4 className="title" style={{ marginTop: "2rem", fontSize: "1.1rem" }}>Negative Positions (In Loss)</h4>
              <div className="order-table">
                <table>
                  <tbody>
                    <tr>
                      <th>Instrument</th>
                      <th>Qty.</th>
                      <th>Buy Price</th>
                      <th>Current Price</th>
                      <th>% Change</th>
                    </tr>

                    {negativePositions.map((stock, index) => {
                      const pctChangeValue = ((stock.price - stock.avg) / stock.avg) * 100;
                      const profClass = "loss";

                      return (
                        <tr key={index}>
                          <td>{stock.name}</td>
                          <td>{stock.qty}</td>
                          <td>{stock.avg.toFixed(2)}</td>
                          <td>{stock.price.toFixed(2)}</td>
                          <td className={profClass}>
                            {pctChangeValue.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Positions;
