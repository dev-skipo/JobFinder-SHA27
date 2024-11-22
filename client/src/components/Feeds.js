// src/components/Feeds.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Feeds() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts'); // Adjust endpoint as needed
            // Sort posts by postedAt in descending order
            const sortedPosts = response.data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
            setPosts(sortedPosts); // Set sorted posts
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount

        const intervalId = setInterval(fetchPosts, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Feeds</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                        <Link to={`/feeds/${post._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default Feeds;