// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to="/login" />; // Redirect to login if not logged in
};

export default PrivateRoute;