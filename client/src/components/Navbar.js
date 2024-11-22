// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <nav>
            <h1>MyApp</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/feeds">Feeds</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/post">Create Post</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/login" onClick={onLogout}>Logout</Link></li> {/* Call logout handler */}
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;