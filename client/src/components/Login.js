// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store JWT token
            localStorage.setItem('userId', response.data.userId); // Store User ID
            onLogin(); // Call the onLogin function to update state in App.js
            alert('Login successful!');
            navigate('/feeds'); // Redirect to feeds page
        } catch (error) {
            setErrorMessage('Login failed! Please check your credentials.'); // Set error message
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Login</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Display error message */}
            <Form onSubmit={handleLogin}>
                <Row className="mb-3 justify-content-center">
                    <Col md={4}> {/* Set width of input fields */}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-center">
                    <Col md={4}> {/* Set width of input fields */}
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-center">
                    <Col md={4}> {/* Set width of button */}
                        <Button variant="primary" type="submit" block>Login</Button> {/* Block button for full width */}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Login;