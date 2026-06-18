import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Login() {
    // Assuming your dashboard app runs on port 3001. Adjust the port if necessary.
    const dashboardLoginUrl = "http://localhost:3000/login";

    useEffect(() => {
        // Parse the target URL
        const targetUrl = new URL(dashboardLoginUrl);
        
        // Prevent infinite reload loop by making sure we are actually changing domains/ports
        if (window.location.origin !== targetUrl.origin) {
            window.location.replace(dashboardLoginUrl);
        }
    }, []);

    return ( 
        <>
        <Navbar />
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2>Redirecting to Dashboard Login...</h2>
            <p>If you are not redirected automatically, <a href={dashboardLoginUrl}>click here</a>.</p>
        </div>
        <Footer />
        </>
     );
}

export default Login;