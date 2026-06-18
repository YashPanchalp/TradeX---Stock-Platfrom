import React from 'react'
import { Link } from 'react-router-dom';

function OpenAccount() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <h1 className='mt-5'>Open a TradeX Account</h1>
                <p className='mt-2'>Modern platform and apps , ₹0 investments and flat ₹20 intradaya and F&O trades. </p>
                <Link to="http://localhost:3000/signup" className='p-2 mt-1 btn btn-primary fs-5 signup-cta'
                style={{margin: "0 auto", color:"white",maxWidth: "180px" }}>
                    Signup Now
                </Link>
            </div>
        </div>
     );
}

export default OpenAccount;