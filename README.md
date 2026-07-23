# TradeX - Stock Trading Platform

TradeX is a full-stack stock trading and investment platform. It simulates a modern brokerage application, allowing users to create accounts, manage funds, buy and sell stocks, and track their portfolio holdings and positions in real-time.

## 🔗 Live Demos
- **Landing Page**: [https://trade-x-stock-platfrom-fpu7.vercel.app/](https://trade-x-stock-platfrom-fpu7.vercel.app/)
- **Dashboard**: [https://trade-x-stock-platfrom-ay8v.vercel.app/](https://trade-x-stock-platfrom-ay8v.vercel.app/)

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Landing Page**: A beautifully designed frontend showcasing the platform's features, products, and pricing.
- **Interactive Dashboard**: A dedicated dashboard for authenticated users to manage their trading activities.
- **Funds Management**: Users can simulate adding and withdrawing funds to/from their trading account.
- **Order Execution**: Place **Buy** and **Sell** orders (CNC - Cash and Carry) for various stocks.
- **Portfolio Tracking**: Real-time updates to **Holdings** and **Positions** when orders are executed. Available margin and used margin are calculated dynamically.

## 🏗️ Project Structure

The project is structured as a monorepo containing three main modules:

1. **`frontend/`**: The public-facing landing page website.
2. **`dashboard/`**: The secure trading application where users interact with the market.
3. **`backend/`**: The Node.js/Express REST API that serves data and handles business logic.

## 🛠️ Tech Stack

- **Frontend & Dashboard**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcryptjs
- **Deployment**: Vercel

## ⚙️ Local Development Setup

Follow these steps to run the TradeX platform on your local machine.

### Prerequisites
- Node.js installed on your system.
- A MongoDB cluster (or local MongoDB server).

### 1. Clone the repository
```bash
git clone https://github.com/YashPanchalp/TradeX---Stock-Platfrom.git
cd TradeX---Stock-Platfrom
```

### 2. Environment Variables

The project uses `.env` files to manage environment-specific configurations. The default ports are already configured.

**Backend (`backend/.env`)**
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3002
```

**Frontend (`frontend/.env`)**
```env
PORT=3000
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

**Dashboard (`dashboard/.env`)**
```env
PORT=3001
REACT_APP_API_URL=http://localhost:3002
```

### 3. Install Dependencies and Run

You need to open three separate terminal windows to run all three services concurrently.

**Terminal 1: Backend (Port 3002)**
```bash
cd backend
npm install
npm start
```

**Terminal 2: Dashboard (Port 3001)**
```bash
cd dashboard
npm install
npm start
```

**Terminal 3: Frontend (Port 3000)**
```bash
cd frontend
npm install
npm start
```

## 🌐 Default Ports

To ensure smooth communication between the microservices locally, the following default ports are assigned:

| Service   | Port | Local URL                 |
| --------- | ---- | ------------------------- |
| Frontend  | 3000 | `http://localhost:3000`   |
| Dashboard | 3001 | `http://localhost:3001`   |
| Backend   | 3002 | `http://localhost:3002`   |

## 📝 Working / Flow

1. **Visit Frontend**: Users visit `http://localhost:3000` to learn about the platform.
2. **Signup/Login**: Clicking on Signup/Login redirects the user to the Dashboard app (`http://localhost:3001/signup`).
3. **Authentication**: The Dashboard sends credentials to the Backend (`http://localhost:3002`). Upon success, a JWT is stored securely.
4. **Dashboard View**: The authenticated user can view their available margin (Funds), current Holdings, and daily Positions.
5. **Trading**:
   - The user selects a stock to Buy/Sell.
   - The order is sent to the backend.
   - The backend validates if the user has enough funds (for buying) or enough shares (for selling).
   - Once validated, the order is executed. Funds are deducted/added, and Holdings/Positions are dynamically updated.
