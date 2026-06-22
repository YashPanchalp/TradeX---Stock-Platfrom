import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [balance, setBalance] = useState(0);
  const [usedMargin, setUsedMargin] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ADD"); // 'ADD' or 'WITHDRAW'
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const context = useContext(GeneralContext);

  useEffect(() => {
    fetchFunds();
  }, [context.refreshTrigger]);

  const fetchFunds = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/funds`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(res.data.balance);
      setBankAccount(res.data.bankAccount);

      const holdingsRes = await axios.get(`${process.env.REACT_APP_API_URL}/allHoldings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let totalUsed = 0;
      holdingsRes.data.forEach(stock => {
        totalUsed += (stock.avg * stock.qty) * 1.15;
      });
      setUsedMargin(totalUsed);
    } catch (err) {
      console.warn("Failed to fetch funds", err);
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setAmount("");
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    const available = balance - usedMargin;
    if (modalType === "WITHDRAW" && numAmount > available) {
      setError(`You only have ₹${available.toFixed(2)} available to withdraw`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/funds/update`, {
        amount: numAmount,
        action: modalType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(res.data.balance);
      setIsModalOpen(false);
      context.triggerRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred processing request");
    }
  };

  return (
    <>
      <div className="funds">
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn btn-green" onClick={() => handleOpenModal("ADD")}>Add funds</button>
          <button className="btn btn-blue" onClick={() => handleOpenModal("WITHDRAW")}>Withdraw</button>
        </div>
        <p>Instant, zero-cost fund transfers with UPI </p>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{(balance - usedMargin).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{usedMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalType === "ADD" ? "Add Funds to Account" : "Withdraw Funds"}</h3>
            
            <div className="bank-info">
              <strong>Linked Bank Account:</strong><br/>
              XXXX-XXXX-{bankAccount.slice(-4) || "0000"}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="Enter amount" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  min="1" 
                  step="0.01"
                  required 
                />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" style={{ background: "transparent", color: "var(--page-text)", border: "1px solid var(--page-border)" }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={`btn ${modalType === "ADD" ? "btn-green" : "btn-blue"}`}>
                  {modalType === "ADD" ? "Proceed to Add" : "Confirm Withdraw"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
