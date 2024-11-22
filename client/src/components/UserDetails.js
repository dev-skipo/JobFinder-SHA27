// src/components/UserDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]); // State for storing user's posts

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);

                // Fetch user's posts
                const postsResponse = await axios.get(`http://localhost:5000/api/posts/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPosts(postsResponse.data); // Set user's posts
            } catch (err) {
                alert('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    if (loading) return <p>Loading...</p>;

    if (!isLoggedIn) {
        return (
            <div>
                <p>Please <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>log in</Link> to see this profile.</p>
            </div>
        );
    }

    if (!user) return <p>No user found.</p>;

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Zip Code:</strong> {user.zipCode}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>

            <h2>Posts by {user.fullName}</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                        <Link to={`/feeds/${post._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default UserDetails;