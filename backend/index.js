//-------------------------------------------//
require("dotenv").config();
const express = require("express");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");
const { UserModel } = require("./model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
//------------------------------------------//

app.use(cors());
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
    res.status(500).json({ message: "Error signing up", error });
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
    res.status(500).json({ message: "Error logging in", error });
  }
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];
//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });
//     newHolding.save();
//   });
//   res.send("Done save")
// });


// app.get("/addPositions", async(req,res) => {
//   let tempPositions = [{
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   }];
//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//     product : item.product,
//     name : item.name,
//     qty : item.qty,
//     avg : item.avg,
//     price : item.price,
//     net : item.net,
//     day : item.day ,
//     isLoss : item.isLoss,
//     });
//     newPosition.save();
//   });
//   res.send("Done Post Sace!")
// })

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

app.get("/", (req, res) => {
  res.send("Home route");
});

app.listen(PORT, () => {
  console.log("App running on port 3002");
  mongoose.connect(url);
});
