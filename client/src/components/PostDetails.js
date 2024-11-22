// src/components/PostDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PostDetails() {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
    const navigate = useNavigate(); // For navigation after deletion

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`); // Fetch post by ID
                setPost(response.data);

                // Fetch related posts based on the user ID of the post creator
                const relatedResponse = await axios.get(`http://localhost:5000/api/posts/user/${response.data.userId._id}`);
                setRelatedPosts(relatedResponse.data);
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const token = localStorage.getItem('token'); // Get token from local storage
    const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null; // Decode token to get user ID

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>No post found.</p>;

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in headers for authentication
                }
            });
            alert('Post deleted successfully!');
            navigate('/feeds'); // Redirect to feeds after deletion
        } catch (err) {
            alert('Failed to delete post');
        }
    };

    return (
        <div>
            <h1>{post.title}</h1>
            <p>
                <strong>Posted By:</strong> 
                {post.userId ? (
                    <Link to={`/user/${post.userId._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                        {post.userId.fullName}
                    </Link>
                ) : (
                    'Unknown User'
                )}
            </p>
            <p>{post.description}</p>
            <p><strong>Requirement:</strong> {post.requirement}</p>
            <p><strong>Salary:</strong> ${post.salary}</p>
            <p><strong>Position:</strong> {post.position}</p>
            <p><strong>Terms:</strong> {post.terms}</p>
            <p><strong>Location:</strong> {post.location}</p>

            {token ? (
                <>
                    {post.userId && post.userId._id === userId && (
                        <>
                            <button onClick={() => navigate(`/edit-post/${id}`)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                    <p><strong>Contact Info:</strong> {post.contactInfo}</p>
                </>
            ) : (
                <p>
                    <strong>Contact Info:</strong> 
                    <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                        # Login to see contact information
                    </Link>
                </p>
            )}
            
            <h2>Related Posts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {relatedPosts.map(relatedPost => (
                    <div key={relatedPost._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        {/* Make the entire card clickable */}
                        <Link to={`/feeds/${relatedPost._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <h3>{relatedPost.title}</h3>
                            <p>{relatedPost.description}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <p><small>Posted at: {new Date(post.postedAt).toLocaleString()}</small></p>
        </div>
    );
}

export default PostDetails;