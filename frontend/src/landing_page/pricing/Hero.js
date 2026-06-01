import React from 'react'

function Hero() {
    return ( 
        <div className='container'>
            <div className='row p-5 border-bottom text-center'>
                <h1>Pricing</h1>
                <br></br>
                <h4 className='mt-3 text-muted fs-5'>Free equity investments and flat ₹20 Intraday and F&O trades</h4>
            </div>    
            <div className='row p-5 pricing-features-row'>
                <div className='col-lg-4 col-12 p-5 text-center pricing-feature-card'>
                    <img src='media/images/pricingEquity.svg' alt='Free equity delivery'/>
                    <h2  className='fs-3'>Free equity delivery</h2>
                    <p className='text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col-lg-4 col-12 p-5 text-center pricing-feature-card'>
                    <img src='media/images/intradayTrades.svg' alt='Intraday and F&O trades'/>
                    <h2 className='fs-3'>Intraday and F&O trades</h2>
                    <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col-lg-4 col-12 p-5 text-center pricing-feature-card'>
                    <img src='media/images/pricingEquity.svg' alt='Free direct MF'/>
                    <h2 className='fs-3'>Free direct MF</h2>
                    <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;