import React from 'react'
import './support.css'

function CreateTicket() {
    return (
        <div className='container support-container'>
            <div className='support-top support-search-top'>
                <div className='row align-items-center mb-3'>
                    <div className='col-12 col-lg-8'>
                        <h1 className='fs-2 mb-2'>Support Portal</h1>
                        <p className='support-top-copy mb-0'>Search help topics and connect with TradeX support in a few clicks.</p>
                    </div>
                    <div className='col-12 col-lg-4 text-end'>
                        <button className='btn btn-primary'>My tickets</button>
                    </div>
                </div>

                <div className='row support-search'>
                    <div className='col-12'>
                        <div className='input-group support-searchbar'>
                            <span className='input-group-text'><i className='fa fa-search'></i></span>
                            <input className='form-control' placeholder='Eg: How do I open my account, How do i activate F&O...' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row support-body-row'>
                <div className='col-lg-8'>
                    <div className='accordion' id='supportAccordion'>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingOne'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                                    <span className='icon-circle'><i className='fa fa-plus'></i></span>
                                    <span className='header-text'>Account Opening</span>
                                </button>
                            </h2>
                            <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>Resident individual</li>
                                        <li>Minor</li>
                                        <li>Non Resident Indian (NRI)</li>
                                        <li>Company, Partnership, HUF and LLP</li>
                                        <li>Glossary</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingTwo'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
                                    <span className='icon-circle'><i className='fa fa-user'></i></span>
                                    <span className='header-text'>Your TradeX Account</span>
                                </button>
                            </h2>
                            <div id='collapseTwo' className='accordion-collapse collapse' aria-labelledby='headingTwo' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>Your profile</li>
                                        <li>Account modification</li>
                                        <li>Client Master Report</li>
                                        <li>Nomination</li>
                                        <li>Transfer and conversion </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingThree'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>
                                    <span className='icon-circle'><i className='fa fa-rocket'></i></span>
                                    <span className='header-text'>Kite</span>
                                </button>
                            </h2>
                            <div id='collapseThree' className='accordion-collapse collapse' aria-labelledby='headingThree' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>IPO</li>
                                        <li>Trading FAQs</li>
                                        <li>Margin Trading Facility (MTF) and Margins</li>
                                        <li>Charts and orders</li>
                                        <li>Alerts and Nudges</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingFour'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFour' aria-expanded='false' aria-controls='collapseFour'>
                                    <span className='icon-circle'><i class="fa fa-money" aria-hidden="true"></i></span>
                                    <span className='header-text'>Funds</span>
                                </button>
                            </h2>
                            <div id='collapseFour' className='accordion-collapse collapse' aria-labelledby='headingFour' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>Add money</li>
                                        <li>Withdraw money</li>
                                        <li>Add bank accounts</li>
                                        <li>eMandates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingFive'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFive' aria-expanded='false' aria-controls='collapseFive'>
                                    <span className='icon-circle'><i className='fa fa-desktop'></i></span>
                                    <span className='header-text'>Console</span>
                                </button>
                            </h2>
                            <div id='collapseFive' className='accordion-collapse collapse' aria-labelledby='headingFive' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>Portfolio</li>
                                        <li>Corporate actions</li>
                                        <li>Funds statement</li>
                                        <li>Reports</li>
                                        <li>Profile</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='headingSix'>
                                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSix' aria-expanded='false' aria-controls='collapseSix'>
                                    <span className='icon-circle'><i class="fa fa-inr" aria-hidden="true"></i>
</span>
                                    <span className='header-text'>Coin</span>
                                </button>
                            </h2>
                            <div id='collapseSix' className='accordion-collapse collapse' aria-labelledby='headingSix' data-bs-parent='#supportAccordion'>
                                <div className='accordion-body'>
                                    <ul>
                                        <li>Mutual funds</li>
                                        <li>National Pension Scheme (NPS)</li>
                                        <li>Fixed Deposit (FD)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-lg-4'>
                    <div className='support-notice-card'>
                        <div className='support-notice-badge'>Live updates</div>
                        <ul>
                            <li><button type='button' className='support-link-button'>Scheduled maintenance for Coin</button></li>
                            <li><button type='button' className='support-link-button'>Additional exposure margin on securities under MWPL</button></li>
                        </ul>
                    </div>

                    <div className='card quick-links support-side-card'>
                        <div className='card-body'>
                            <h6>Quick links</h6>
                            <ol className='mb-0'>
                                <li>Track account opening</li>
                                <li>Track segment activation</li>
                                <li>Intraday margins</li>
                                <li>Kite user manual</li>
                                <li>Learn how to create a ticket</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;