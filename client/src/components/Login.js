import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./style/PostForm.css"; // css

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token); // Store JWT token
      localStorage.setItem("userId", response.data.userId); // //  User ID
      onLogin();
      // alert+("Login successful!"); // Alert for me
      navigate("/feeds"); // Redirect
    } catch (error) {
      setErrorMessage("Login failed! Please check your credentials.");
    }
  };

  return (
    <section className="Page-layout d-flex align-items-center justify-content-center bg-light">
    <Container >

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleLogin}>
        <Row className="mb-3 justify-content-center">
          <Col md={4}>
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
          <Col md={4}>
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
        <Row className="mb-3 pt-3 justify-content-center">
          <Col md={4}>
            <Button variant="dark" type="submit" block>
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
    </section>
  );
};

export default Login;
