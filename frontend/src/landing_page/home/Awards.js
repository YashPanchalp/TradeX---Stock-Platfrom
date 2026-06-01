import React from 'react'

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/images/largestBroker.svg' />
                </div>
                <div className='col-6 p-5 mt-3'>
                    <h1>Largest stock broker in India</h1>
                    <p className='mb-5'>2+ Million TradeX clients contribute to over 15% of all the volumes in India daily by trading and investing in :</p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul>
                                <li><p>Futures and Options</p></li>
                                <li><p>Commodity derivatives</p></li>
                                <li><p>Currency derivatives</p></li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li><p>Stocks and IPOs</p></li>
                                <li><p>Direct Mutual Funds</p></li>
                                <li><p>Binds and Govt Securities</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Awards;