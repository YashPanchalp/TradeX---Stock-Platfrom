import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center p-5">
        <h2>The TradeX Universe</h2>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png"  style={{height:"45px",width:"180px"}}/>
          <p className="text-muted">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png"  style={{height:"45px",width:"180px"}}/>
          <p className="text-muted">Systematic trading platform
that allows you to create and backtest
strategies without coding.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png"  style={{height:"42px",width:"180px"}}/>
          <p className="text-muted">Personalized advice on life
and health insurance. No spam
and no mis-selling.
Sign up for free</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg " style={{height:"45px",width:"180px"}}/>
          <p className="text-muted">Options trading platform that lets you
create strategies, analyze positions, and examine
data points like open interest, FII/DII, and more.
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/logo.svg"  style={{height:"42px",width:"180px"}}/>
          <p className="text-muted">Our asset management venture
that is creating simple and transparent index
funds to help you save for your goals.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" style={{height:"45px",width:"180px"}} />
          <p className="text-muted">Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.
</p>
        </div>

        <button className='p-2 mt-5 mb-5 btn btn-primary fs-5 signup-cta'
          style={{margin: "0 auto"
          }}>Signup Now</button>
      </div>
    </div>
  );
}

export default Universe;
