// src/components/Settings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/users/${localStorage.getItem('userId')}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                alert('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/users/${localStorage.getItem('userId')}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Profile updated successfully!');
            navigate('/feeds'); // Redirect after successful update
        } catch (err) {
            alert('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Settings</h1>
            <input name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} required />
            <input name="email" placeholder="Email" type="email" value={userData.email} onChange={handleChange} required />
            <input name="country" placeholder="Country" value={userData.country} onChange={handleChange} />
            <input name="city" placeholder="City" value={userData.city} onChange={handleChange} />
            <input name="address" placeholder="Address" value={userData.address} onChange={handleChange} />
            <input name="zipCode" placeholder="Zip Code" value={userData.zipCode} onChange={handleChange} />
            <input name="phoneNumber" placeholder="Phone Number" value={userData.phoneNumber} onChange={handleChange} />

            <button type="submit">Update Profile</button>
        </form>
    );
}

export default Settings;