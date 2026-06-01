import React from 'react'
import Footer from '../Footer';
import Navbar from '../Navbar';
import Hero from './Hero';
import Team from './Team';

function About() {
    return ( 
        <>
            <Navbar />
            <main className='page-stack'>
                <Hero />
                <Team />
            </main>
            <Footer />
        </>
        
     );
}

export default About;