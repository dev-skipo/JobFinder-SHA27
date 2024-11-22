// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            setSuccessMessage('Registration successful! Redirecting to login...'); // Set success message
            setErrorMessage(''); // Clear any previous error messages

            // Optionally reset form data after successful registration
            setFormData({
                fullName: '',
                email: '',
                password: '',
                country: '',
                city: '',
                address: '',
                zipCode: '',
                phoneNumber: ''
            });

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 2000); // Adjust the delay as needed (2000 ms = 2 seconds)

        } catch (error) {
            setErrorMessage('Registration failed! Please check your input.'); // Set error message
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Register</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Display error message */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
            <Form onSubmit={handleRegister}>
                {/* Row 1 */}
                <Row className="mb-3">
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fullName" 
                                placeholder="Enter your full name" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 2 */}
                <Row className="mb-3">
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="country" 
                                placeholder="Enter your country" 
                                value={formData.country} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 3 */}
                <Row className="mb-3">
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="city" 
                                placeholder="Enter your city" 
                                value={formData.city} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="address" 
                                placeholder="Enter your address" 
                                value={formData.address} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 4 */}
                <Row className="mb-3">
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formZipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="zipCode" 
                                placeholder="Enter your zip code" 
                                value={formData.zipCode} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}> {/* Set width of input fields to be shorter */}
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="phoneNumber" 
                                placeholder="Enter your phone number" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Register Button aligned to the right */}
                <Row className="mb-3 justify-content-end">
                    <Col md={4}>
                        <Button variant="primary" type="submit">Register</Button> {/* Submit button */}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Register;