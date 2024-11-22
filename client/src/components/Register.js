// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert('Registration successful!');
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
            <input name="country" placeholder="Country" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="address" placeholder="Address" onChange={handleChange} />
            <input name="zipCode" placeholder="Zip Code" onChange={handleChange} />
            <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;