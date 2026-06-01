import React from 'react'

function Pricing() {
    return ( 
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-5 mx-5 px-5'>
                    <h1 className='mb-5'>Unbeatable pricing</h1>
                    <p>We pioneered the concept of discount broking and price transsperency in India. Flat fees and no hidden charges</p>
                    <a href='' style={{textDecoration:"none"}}>See pricing <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
               
                <div className='col-5 mx-5'>
                    <div className='row text-center'>
                        <div className='col p-3 border'>
                            <h1 className='mb-3'>₹0</h1>
                            <p>Free equity delivery and direct mutual funds</p>
                        </div>
                        <div className='col p-3 border'>
                            <h1 className='mb-3'>₹20</h1>
                            <p>Intraday & F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;