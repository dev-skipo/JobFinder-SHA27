import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./style/PostForm.css"; // css

function Settings() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        alert("Failed to fetch user data");
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
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/${localStorage.getItem("userId")}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="Page-layout d-flex align-items-center justify-content-center">
    <Container >
      <h1 className="text-start py-3 pb-5"><i class="bi bi-sliders2"></i> Settings</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
      <p className="pb-4 text-muted">Personal Informations</p>
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
                disabled={!isEditing} // Disable input
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
                disabled={!isEditing} // Disable input
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
                disabled={!isEditing} // Disable input
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
                disabled={!isEditing} // Disable input
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
                disabled={!isEditing} // Disable input
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
                disabled={!isEditing} // Disable input
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 pb-4">
          <Col>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={userData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing} // Disable input
              />
            </Form.Group>
          </Col>
        </Row>

        {!isEditing ? (
          <Button variant="dark" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button variant="dark" type="submit">
            <i class="bi bi-check2-all"></i> Update Profile
            </Button>{" "}
            <Button variant="outline-dark" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        )}
      </Form>
    </Container>
    </section>
  );
}

export default Settings;
