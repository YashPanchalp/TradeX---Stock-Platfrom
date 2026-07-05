import React from "react";
import {Link} from "react-router-dom";

function Universe() {
  const dashBoardSignUpUrl = `${process.env.REACT_APP_DASHBOARD_URL}/signup`;
  return (
    <div className="container mt-5 universe-page">
      <div className="row text-center p-5 universe-grid">
        <h2 className="universe-title">The TradeX Universe</h2>
        <p className="universe-subtitle">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/smallcaseLogo.png" alt="Smallcase logo" />
          <p className="text-muted universe-copy">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/streakLogo.png" alt="Streak logo" />
          <p className="text-muted universe-copy">Systematic trading platform
that allows you to create and backtest
strategies without coding.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/dittoLogo.png" alt="Ditto logo" />
          <p className="text-muted universe-copy">Personalized advice on life
and health insurance. No spam
and no mis-selling.
Sign up for free</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/sensibullLogo.svg" alt="Sensibull logo" />
          <p className="text-muted universe-copy">Options trading platform that lets you
create strategies, analyze positions, and examine
data points like open interest, FII/DII, and more.
</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/logo.svg" alt="TradeX logo" />
          <p className="text-muted universe-copy">Our asset management venture
that is creating simple and transparent index
funds to help you save for your goals.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-3 mt-5 universe-card">
          <img className="universe-logo" src="media/images/goldenpiLogo.png" alt="GoldenPi logo" />
          <p className="text-muted universe-copy">Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.
</p>
        </div>

        <Link to={dashBoardSignUpUrl} className='p-2 mt-5 mb-5 btn btn-primary fs-5 signup-cta'
          style={{margin: "0 auto",
            color:"white"
          }}>Signup Now</Link>
      </div>
    </div>
  );
}

export default Universe;
