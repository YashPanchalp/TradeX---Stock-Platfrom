import React from 'react'

function Hero() {
    return ( 
        <div className='container'>
            <div className='text-center mt-5 p-3'>
                <h2>TradeX Products</h2>
                <h4 className='text-muted mt-3 fs-4'>Sleek, modern, and intuitive trading platforms</h4>
                <p className='mt-3'>Check out our <a href='#'style={{textDecoration:null}}>investment offerings <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a></p>
            </div>
        </div>
     );
}

export default Hero;