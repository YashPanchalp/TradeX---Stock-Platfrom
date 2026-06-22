//-------------------------------------------//
require("dotenv").config();
const express = require("express");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { FundsModel } = require("../model/FundsModel");
const { UserModel } = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
//------------------------------------------//

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://trade-x-stock-platfrom.vercel.app",
    "https://trade-x-stock-platfrom-ay8v.vercel.app/"
  ],
  credentials: true
}));
app.use(bodyParser.json());


// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// AUTH ENDPOINTS
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, bankAccount } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword, bankAccount });
    await newUser.save();

    const newFunds = new FundsModel({ user: newUser._id, balance: 0 });
    await newFunds.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "1d" });
    res.status(201).json({ message: "User created successfully", token, name: newUser.name });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
    message: "Error signing up",
    error: error.message
  });
  }
});


//lOGIN rOUTE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", token, name: user.name });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
    message: "Error logging in",
    error: error.message
  });
  }
});

//API ENDPOINT TO GET THE HOLDINGS DATA
app.get('/allHoldings', authenticateToken, async(req,res)=> {
  let allHoldings = await HoldingsModel.find({ user: req.user.id });
  res.json(allHoldings);
})

//API ENDPOINT TO GET THE POSTITIONS DATA
app.get('/allPositions', authenticateToken, async(req,res)=> {
  let allPositions = await PositionsModel.find({ user: req.user.id });
  res.json(allPositions);
})

//API ENDPOINT TO GET THE ORDERS DATA
app.get('/allOrders', authenticateToken, async(req,res)=> {
  let allOrders = await OrdersModel.find({ user: req.user.id });
  res.json(allOrders);
})

// API ENDPOINT TO GET FUNDS AND BANK ACCOUNT
app.get('/funds', authenticateToken, async(req, res) => {
  let funds = await FundsModel.findOne({ user: req.user.id });
  if (!funds) {
    funds = new FundsModel({ user: req.user.id, balance: 0 });
    await funds.save();
  }
  const user = await UserModel.findById(req.user.id);
  res.json({ balance: funds.balance, bankAccount: user ? user.bankAccount : 'Not Available' });
});

// API ENDPOINT TO GET USER PROFILE
app.get('/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    const funds = await FundsModel.findOne({ user: req.user.id });
    res.json({
      name: user.name,
      email: user.email,
      bankAccount: user.bankAccount,
      balance: funds ? funds.balance : 0,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// API ENDPOINT TO UPDATE FUNDS (ADD/WITHDRAW)
app.post('/funds/update', authenticateToken, async(req, res) => {
  const { amount, action } = req.body;
  let funds = await FundsModel.findOne({ user: req.user.id });
  if (!funds) {
    funds = new FundsModel({ user: req.user.id, balance: 0 });
  }
  
  if (action === 'ADD') {
    funds.balance += Number(amount);
  } else if (action === 'WITHDRAW') {
    let allHoldings = await HoldingsModel.find({ user: req.user.id });
    let currentUsedMargin = 0;
    allHoldings.forEach(h => currentUsedMargin += (h.avg * h.qty) * 1.15);
    let availableMargin = funds.balance - currentUsedMargin;
    if (availableMargin < Number(amount)) {
      return res.status(400).json({ message: `Insufficient available margin. You only have ₹${availableMargin.toFixed(2)} to withdraw` });
    }
    funds.balance -= Number(amount);
  }
  await funds.save();
  res.json({ balance: funds.balance });
});

//API ENDPOINT FOR THE PLACE NEW ORDER
app.post('/newOrder', authenticateToken, async (req,res) => {
  const orderQty = Number(req.body.qty);
  const orderPrice = Number(req.body.price);
  const totalValue = orderQty * orderPrice;
  const marginNeeded = totalValue + (totalValue * 0.15); // price total + 15%

  let funds = await FundsModel.findOne({ user: req.user.id });
  if (!funds) {
    funds = new FundsModel({ user: req.user.id, balance: 0 });
  }

  if (req.body.mode === "BUY") {
    let allHoldings = await HoldingsModel.find({ user: req.user.id });
    let currentUsedMargin = 0;
    allHoldings.forEach(h => currentUsedMargin += (h.avg * h.qty) * 1.15);
    
    if (funds.balance - currentUsedMargin < marginNeeded) {
      return res.status(400).json({ message: "Insufficient margin. Please add more funds." });
    }
  } else if (req.body.mode === "SELL") {
    let holding = await HoldingsModel.findOne({ name: req.body.name, user: req.user.id });
    if (!holding || holding.qty < orderQty) {
      return res.status(400).json({ message: "Insufficient holdings to sell." });
    }
        
        // Update funds with the realized profit/loss so cash is correctly returned
        const realizedPnL = (orderPrice - holding.avg) * orderQty;
        funds.balance += realizedPnL;
        await funds.save();
  }

  let newOrder = new OrdersModel({
    name : req.body.name,
    qty : orderQty,
    price : orderPrice,
    mode : req.body.mode,
    user : req.user.id,
  });
  await newOrder.save();

  // Dynamically update Holdings based on the new order
  if (req.body.mode === "BUY") {
    let holding = await HoldingsModel.findOne({ name: req.body.name, user: req.user.id });
    
    if (holding) {
      let totalQty = holding.qty + orderQty;
      let totalHoldingValue = (holding.qty * holding.avg) + totalValue;
      holding.qty = totalQty;
      holding.avg = totalHoldingValue / totalQty;
      await holding.save();
    } else {
      let newHolding = new HoldingsModel({
        name: req.body.name,
        qty: orderQty,
        avg: orderPrice,
        price: orderPrice,
        net: "+0.00%",
        day: "+0.00%",
        user: req.user.id,
      });
      await newHolding.save();
    }

    // Dynamically update Positions
    let position = await PositionsModel.findOne({ name: req.body.name, user: req.user.id });
    if (position) {
      let totalQty = position.qty + orderQty;
      let totalPositionValue = (position.qty * position.avg) + totalValue;
      position.qty = totalQty;
      position.avg = totalPositionValue / totalQty;
      await position.save();
    } else {
      let newPosition = new PositionsModel({
        product: "CNC",
        name: req.body.name,
        qty: orderQty,
        avg: orderPrice,
        price: orderPrice,
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
        user: req.user.id,
      });
      await newPosition.save();
    }
  } else if (req.body.mode === "SELL") {
    let holding = await HoldingsModel.findOne({ name: req.body.name, user: req.user.id });
    if (holding) {
      holding.qty -= orderQty;
      // If the user sold all their shares, remove the holding entirely
      if (holding.qty <= 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    // Dynamically update Positions
    let position = await PositionsModel.findOne({ name: req.body.name, user: req.user.id });
    if (position) {
      position.qty -= orderQty;
      if (position.qty <= 0) {
        await PositionsModel.deleteOne({ _id: position._id });
      } else {
        await position.save();
      }
    }
  }

  res.send("Orders saved");
});



//Local host listen to port 3002 and exports app for vercel (production)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    // Only start server locally
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 3002;

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Export for Vercel
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TradeX Backend Running",
  });
});



// Export app for Vercel
module.exports = app;