import React from 'react'
import Hero from './Hero';
import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Brokerage from './Brokerage';

function PricingPage() {
    return ( 
        <>
        <Navbar />
        <main className='page-stack'>
            <Hero />
            <OpenAccount />
            <Brokerage />
        </main>
        <Footer />
        </>
     );
}

export default PricingPage;