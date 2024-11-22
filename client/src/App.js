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
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token - logout
        setIsLoggedIn(false); // Update login state
    };

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> 
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/feeds" element={<Feeds />} />
                <Route path="/feeds/:id" element={<PostDetails />} />
                
                {/* Protected routes */}
                <Route path="/post" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <PostForm />
                    </PrivateRoute>
                } />
                
                <Route path="/user/:id" element={<UserDetails />} /> 
                <Route path="/edit-post/:id" element={<EditPost />} /> 

                {/* Protected settings route */}
                <Route path="/settings" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Settings />
                    </PrivateRoute>
                } />
            </Routes>
            <Footer /> 
        </Router>
    );
}

export default App;