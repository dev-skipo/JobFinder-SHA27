// src/components/Feeds.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Feeds() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter states
    const [titleFilter, setTitleFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [termsFilter, setTermsFilter] = useState('');
    
    // Filtered posts state
    const [filteredPosts, setFilteredPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts'); // Adjust endpoint as needed
            setPosts(response.data); // Assuming response data is an array of posts
            setFilteredPosts(response.data); // Initialize filtered posts with all posts
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount
    }, []);

    // Handle filtering logic
    useEffect(() => {
        let filtered = posts;

        if (titleFilter) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(titleFilter.toLowerCase())
            );
        }

        if (locationFilter) {
            filtered = filtered.filter(post =>
                post.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (termsFilter) {
            filtered = filtered.filter(post =>
                post.terms.toLowerCase() === termsFilter.toLowerCase() // Match exactly with selected term
            );
        }

        setFilteredPosts(filtered);
    }, [titleFilter, locationFilter, termsFilter, posts]);

    const resetFilters = () => {
        setTitleFilter('');
        setLocationFilter('');
        setTermsFilter('');
        setFilteredPosts(posts); // Reset to show all posts
    };

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h1>Feeds</h1>
            
            {/* Filter Inputs */}
            <Row className="mb-3">
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Search by Title" 
                        value={titleFilter} 
                        onChange={(e) => setTitleFilter(e.target.value)} 
                    />
                </Col>
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Search by Location" 
                        value={locationFilter} 
                        onChange={(e) => setLocationFilter(e.target.value)} 
                    />
                </Col>
                
                {/* Dropdown for Terms */}
                <Col>
                    <Form.Select value={termsFilter} onChange={(e) => setTermsFilter(e.target.value)}>
                        <option value="">Select Terms</option>
                        <option value="full time">Full Time</option>
                        <option value="part time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                    </Form.Select>
                </Col>

                <Col>
                    <Button variant="primary" onClick={resetFilters}>Reset Filters</Button>
                </Col>
            </Row>

            {filteredPosts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <Row>
                    {filteredPosts.map(post => (
                        <Col md={4} key={post._id}>
                            <Card style={{ marginBottom: '20px' }}>
                                <Card.Body>
                                    <Link to={`/feeds/${post._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text><i class="bi bi-geo-alt-fill"></i> {post.location}</Card.Text>
                                        <Card.Text>{post.description}</Card.Text>
                                        <Card.Text><i class="bi bi-building-fill-exclamation"></i> {post.terms}</Card.Text>
                                        <Card.Text><i class="bi bi-currency-dollar"></i> {post.salary} $</Card.Text>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Feeds;