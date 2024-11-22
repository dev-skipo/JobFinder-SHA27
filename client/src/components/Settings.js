// src/components/Settings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

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
    const [isEditing, setIsEditing] = useState(false); // State to control edit mode
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
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
            setSuccessMessage('Profile updated successfully!'); // Set success message
            setIsEditing(false); // Optionally disable editing after update
        } catch (err) {
            alert('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Container className="mt-5">
            <h1 className="text-center">Settings</h1>
            {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fullName" 
                                placeholder="Enter your full name" 
                                value={userData.fullName} 
                                onChange={handleChange} 
                                required 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                value={userData.email} 
                                onChange={handleChange} 
                                required 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="country" 
                                placeholder="Enter your country" 
                                value={userData.country} 
                                onChange={handleChange} 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="city" 
                                placeholder="Enter your city" 
                                value={userData.city} 
                                onChange={handleChange} 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="address" 
                                placeholder="Enter your address" 
                                value={userData.address} 
                                onChange={handleChange} 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formZipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="zipCode" 
                                placeholder="Enter your zip code" 
                                value={userData.zipCode} 
                                onChange={handleChange} 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="phoneNumber" 
                                placeholder="Enter your phone number" 
                                value={userData.phoneNumber} 
                                onChange={handleChange} 
                                disabled={!isEditing} // Disable input if not editing
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Edit and Submit Buttons */}
                {!isEditing ? (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button> // Button to enable editing
                ) : (
                    <>
                        <Button variant="success" type="submit">Update Profile</Button> {/* Submit button */}
                        {' '}
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button> {/* Button to cancel editing */}
                    </>
                )}
            </Form>
        </Container>
    );
}

export default Settings;