// src/components/PostDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Alert, Modal } from 'react-bootstrap';

function PostDetails() {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
    const [showModal, setShowModal] = useState(false); // State for modal visibility
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
        <Container className="mt-5">
            <Row>
                {/* Post Details Section */}
                <Col md={8}> {/* Wider column for post details */}
                <h1>{post.title}</h1>
                    <Card className="mb-4">
                        <Card.Body>
                        {/* <Card.Title>{post.title}</Card.Title> */}
                            <Card.Subtitle className="mb-2 text-muted p-2">
                            Posted By:&nbsp;
                                {post.userId ? (
                                     <Link to={`/user/${post.userId._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {post.userId.fullName}
                                    </Link>
                                ) : (
                                    ' Unknown User'
                                )}
                            </Card.Subtitle>
                            <Card.Text>{post.description}</Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong><i class="bi bi-search"></i> Requirement:</strong> {post.requirement}</ListGroup.Item>
                                <ListGroup.Item><strong><i class="bi bi-currency-dollar"></i> Salary:</strong> {post.salary}</ListGroup.Item>
                                <ListGroup.Item><strong><i class="bi bi-signpost-split-fill"></i> Position:</strong> {post.position}</ListGroup.Item>
                                <ListGroup.Item><strong><i class="bi bi-building-check"></i> Terms:</strong> {post.terms}</ListGroup.Item>
                                <ListGroup.Item><strong><i class="bi bi-geo-alt-fill"></i> Location:</strong> {post.location}</ListGroup.Item>
                            </ListGroup>

                            {token ? (
                                <>
                                    {post.userId && post.userId._id === userId && (
                                        <>
                                            <Button variant="warning" onClick={() => navigate(`/edit-post/${id}`)}><i class="bi bi-pencil-fill"></i> Edit</Button>
                                            {' '}
                                            <Button variant="danger" onClick={() => setShowModal(true)}><i class="bi bi-trash3-fill"></i> Delete</Button>
                                        </>
                                    )}
                                   <p className="px-3 pt-4">
    <strong><i className="bi bi-envelope-check-fill"></i> Contact Info: </strong> 
    <a 
        href={
            post.contactInfo.includes('@') ? `mailto:${post.contactInfo}` : // Email
            post.contactInfo.startsWith('http') ? post.contactInfo : // URL
            post.contactInfo.startsWith('+') || post.contactInfo.startsWith('0') ? `tel:${post.contactInfo}` : // Phone number
            '#'
        } 
        style={{ textDecoration: 'none', color: 'blue' }}
    >
        {post.contactInfo}
    </a>
</p>
                                   
                                </>
                            ) : (
                                <Alert variant="info">
                                    <strong>Contact Info:</strong> 
                                    <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        # Login to see contact information
                                    </Link>
                                </Alert>
                            )}
                            
                            <p className="mt-3"><small>Posted at: {new Date(post.postedAt).toLocaleString()}</small></p>
                        </Card.Body>
                    </Card>
                </Col>

               {/* Related Posts Section */}
<Col md={4}> {/* Narrower column for related posts */}
    <h2 className="text-start">Related Posts</h2>
    {relatedPosts.length === 0 ? (
        <Alert variant="info" className="text-center">No related posts available.</Alert>
    ) : (
        relatedPosts.slice(0, 5).map(relatedPost => ( // Limit to 5 posts
            <Card key={relatedPost._id} className="mb-3">
                <Card.Body>
                    <Link to={`/feeds/${relatedPost._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card.Title>{relatedPost.title}</Card.Title>
                        {/* Truncate the description to a maximum of 100 characters */}
                        <Card.Text>
                            {relatedPost.description.length > 100 ? `${relatedPost.description.substring(0, 150)}...` : relatedPost.description}
                        </Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        ))
    )}
</Col>
            </Row>

            {/* Confirmation Modal for Deletion */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => { handleDelete(); setShowModal(false); }}>
                        Delete Forever
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default PostDetails;