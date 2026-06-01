import React from 'react'

function Education() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                
                <div className='col-6'>
                    <div className='row '>
                        <img src="media/images/education.svg" style={{width:"93%"}}/>
                    </div>
                </div>

                <div className='col-6 mt-5 p-3'>
                    <h1 className='mb-5'>Free and open marcket education</h1>
                    <p className='fs-5'>Varsity , the largest stock marcket education book in the world covering everythinh from the basic to advance tradding</p>
                    <a href='' style={{textDecoration:"none"}}>Varsity <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <p className='mt-5 fs-5'> TraddingQ&A , the most active trading and investment coomunity in india for all your marcket related queries</p>
                    <a href='' style={{textDecoration:"none"}}>TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>

            </div>
        </div>
     );
}

export default Education;