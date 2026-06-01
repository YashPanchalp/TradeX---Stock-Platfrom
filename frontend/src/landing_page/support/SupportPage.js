import React from 'react'
import Navbar from '../Navbar';
import OpenAccount from '../OpenAccount';
import Footer from '../Footer';
import CreateTicket from './CreateTicket';

function SupportPage() {
    return (
        <>

        <Navbar />
        <main className='page-stack'>
            <CreateTicket />
            <OpenAccount/>
        </main>
        <Footer />
        </>
     );
}

export default SupportPage;