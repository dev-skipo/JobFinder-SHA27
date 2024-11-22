// src/components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Our Web App!</h1>
            <p>This is the homepage of our application.</p>
            <p>Feel free to explore:</p>
            <div>
                <Link to="/login" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Login</Link>
                <Link to="/register" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Register</Link>
                <Link to="/feeds" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Feeds</Link>
            </div>
        </div>
    );
}

export default Homepage;