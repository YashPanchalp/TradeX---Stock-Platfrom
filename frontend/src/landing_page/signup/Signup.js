import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Signup() {
    const dashboardSignupUrl = "http://localhost:3000/signup";

    useEffect(() => {
        const targetUrl = new URL(dashboardSignupUrl);
        if (window.location.origin !== targetUrl.origin) {
            window.location.replace(dashboardSignupUrl);
        }
    }, []);

    return ( 
        <>
        <Navbar />
        <div style={{ 
            minHeight: "70vh", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center",
            padding: "2rem",
            textAlign: "center"
        }}>
            <div style={{
                background: "var(--page-surface)",
                border: "1px solid var(--page-border)",
                borderRadius: "16px",
                padding: "3rem 2.5rem",
                maxWidth: "480px",
                width: "100%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
            }}>
                <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontSize: "1.8rem",
                    color: "#fff"
                }}>
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <h2 style={{ margin: "0 0 0.5rem", color: "var(--page-text)", fontWeight: 700 }}>Redirecting to Signup</h2>
                <p style={{ color: "var(--page-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
                    Taking you to the secure TradeX account creation page.
                </p>
                <div style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid var(--page-border)",
                    borderTopColor: "#43e97b",
                    borderRadius: "50%",
                    animation: "spinner 0.8s linear infinite",
                    margin: "0 auto 1.5rem"
                }}></div>
                <a 
                    href={dashboardSignupUrl}
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 2rem",
                        background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                        color: "#0b1220",
                        borderRadius: "10px",
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                    Click here if not redirected
                </a>
            </div>
            <style>{`
                @keyframes spinner { to { transform: rotate(360deg); } }
            `}</style>
        </div>
        <Footer />
        </>
     );
}

export default Signup;
