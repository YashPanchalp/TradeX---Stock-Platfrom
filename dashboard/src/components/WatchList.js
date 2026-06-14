import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist as initialWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const WatchList = () => {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [activeChartStockUID, setActiveChartStockUID] = useState(null);

  useEffect(() => {
    const tick = () => {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.map((stock) => {
          // Random change between -0.10% and +0.10%
          const changePercent = (Math.random() * 2 - 1) / 1000;
          const newPrice = stock.price * (1 + changePercent);
          const diff = newPrice - stock.price;
          
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            isDown: diff < 0,
            percent: (Math.abs(changePercent) * 100).toFixed(2) + "%",
          };
        })
      );
    };

    // Call immediately on mount so the UI isn't blank for the first cycle
    tick();

    // Ticking every 3 seconds for a responsive "live market" feel
    const interval = setInterval(tick, 3000); 

    return () => clearInterval(interval);
  }, []);

  const labels = watchlist.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // datasets: [
  //   {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // ],
  // };

  //  Main components that have the heading , watchlists and charts
  const activeStock = activeChartStockUID ? watchlist.find(s => s.name === activeChartStockUID) : null;
  
  return (
    <div className="watchlist-container">
      {activeStock ? (
        <LiveChart stock={activeStock} onClose={() => setActiveChartStockUID(null)} />
      ) : (
        <>
          <ul className="list">
            {watchlist.map((stock, index) => {
              return <WatchListItem stock={stock} key={index} onAnalyticsClick={() => setActiveChartStockUID(stock.name)} />;
            })}
          </ul>

          <DoughnutChart data={data} />
        </>
      )}
    </div>
  );
};

const LiveChart = ({ stock, onClose }) => {
  const [priceHistory, setPriceHistory] = useState(() => {
    const history = [];
    let currentPrice = stock.price;
    for (let i = 20; i >= 0; i--) {
       history.push(currentPrice);
       const changePercent = (Math.random() * 2 - 1) / 1000;
       currentPrice = currentPrice / (1 + changePercent);
    }
    return history.reverse();
  });
  
  const [labels, setLabels] = useState(() => {
    const lbls = [];
    for (let i = 20; i >= 0; i--) {
      const d = new Date();
      d.setSeconds(d.getSeconds() - i * 3);
      lbls.push(d.toLocaleTimeString());
    }
    return lbls;
  });

  useEffect(() => {
    setPriceHistory(prev => [...prev.slice(1), stock.price]);
    setLabels(prev => {
      const newLabels = [...prev.slice(1)];
      newLabels.push(new Date().toLocaleTimeString());
      return newLabels;
    });
  }, [stock.price]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${stock.name} Live Price`,
        data: priceHistory,
        borderColor: stock.isDown ? "#fa764e" : "#48c237",
        backgroundColor: stock.isDown ? "rgba(250, 118, 78, 0.2)" : "rgba(72, 194, 55, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    scales: {
      x: { display: false },
      y: { beginAtZero: false }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--page-text)' }}>{stock.name}</h3>
          <h2 style={{ margin: 0, color: stock.isDown ? "#fa764e" : "#48c237" }}>₹{stock.price.toFixed(2)}</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: stock.isDown ? "#fa764e" : "#48c237", fontSize: '0.85rem' }}>{stock.isDown ? "▼" : "▲"} {stock.percent}</p>
        </div>
        <button onClick={onClose} style={{ background: 'var(--page-surface-soft)', border: '1px solid var(--page-border)', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--page-text)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
      </div>
      <div style={{ flex: 1, position: 'relative', minHeight: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WatchList;

//----------------------------
// NEW COMPONENT WatchListItem - Charts
//--------------------------

const WatchListItem = ({ stock, onAnalyticsClick }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const { updateCurrentPrice } = useContext(GeneralContext);

  useEffect(() => {
    if (updateCurrentPrice) {
      updateCurrentPrice(stock.name, stock.price);
    }
  }, [stock.price, stock.name, updateCurrentPrice]);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions stock={stock} onAnalyticsClick={onAnalyticsClick} />}
    </li>
  );
};
//----------------------------
// NEW COMPONENT WatchListActions
//--------------------------

const WatchListActions = ({ stock, onAnalyticsClick }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(stock.name, stock.price, "BUY", 1, stock.isDown, stock.percent);
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(stock.name, stock.price, "SELL", 1, stock.isDown, stock.percent);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
        <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={onAnalyticsClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
