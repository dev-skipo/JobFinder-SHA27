// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Feeds from './components/Feeds';
import Homepage from './components/Homepage';
import PostForm from './components/PostForm'; 
import PostDetails from './components/PostDetails'; 
import UserDetails from './components/UserDetails'; 
import EditPost from './components/EditPost'; 
import Settings from './components/Settings'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login state

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token on logout
        setIsLoggedIn(false); // Update login state
    };

    useEffect(() => {
        // Check if token exists on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass login state and logout handler */}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass login handler */}
                <Route path="/register" element={<Register />} />
                <Route path="/feeds" element={<Feeds />} />
                <Route path="/feeds/:id" element={<PostDetails />} />
                <Route path="/post" element={<PostForm />} />
                <Route path="/user/:id" element={<UserDetails />} /> 
                <Route path="/edit-post/:id" element={<EditPost />} /> 
                <Route path="/settings" element={<Settings />} /> {/* Route for settings */}
            </Routes>
            <Footer /> {/* Add Footer here */}
        </Router>
    );
}

export default App;