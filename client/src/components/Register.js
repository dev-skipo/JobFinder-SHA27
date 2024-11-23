import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style/PostForm.css"; // css

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage("");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        country: "",
        city: "",
        address: "",
        zipCode: "",
        phoneNumber: "",
      });

      setTimeout(() => {
        navigate("/login"); // Redirect
      }, 2000); // (2000 ms = 2 seconds)
    } catch (error) {
      setErrorMessage("Registration failed! Please check your input.");
      setSuccessMessage("");
    }
  };

  return (
    <section className="Page-layout d-flex align-items-center justify-content-center bg-light">

    <Container >
      <h1 className="text-center">Register</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleRegister} >
        {/* Row 1 */}
        <Row className="mb-3">
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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

        <Row className="mb-3 justify-content-end">
          <Col md={4}>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
    </section>
  );
}

export default Register;
