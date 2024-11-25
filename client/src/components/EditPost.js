import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function EditPost() {
  const { id } = useParams(); // Post ID - URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    position: "hiring",
    terms: "full time",
    location: "",
    contactInfo: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jobfinder-sha27.onrender.com/api/posts/${id}`
        );
        setFormData(response.data);
      } catch (err) {
        setErrorMessage("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://jobfinder-sha27.onrender.com/api/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Post updated successfully!");
      navigate(`/feeds/${id}`); // Redirect
    } catch (err) {
      setErrorMessage("Failed to update post");
    }
  };

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container className="mt-5 py-5">
      <h1 className="text-start py-3">Edit Post</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter post description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formRequirement">
              <Form.Label>Requirement</Form.Label>
              <Form.Control
                type="text"
                name="requirement"
                placeholder="Enter requirements"
                value={formData.requirement}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="hiring">Hiring</option>
                <option value="looking for job">Looking for Job</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTerms">
              <Form.Label>Terms</Form.Label>
              <Form.Control
                as="select"
                name="terms"
                value={formData.terms}
                onChange={handleChange}
              >
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 pb-4">
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formContactInfo">
              <Form.Label>Contact Info</Form.Label>
              <Form.Control
                type="text"
                name="contactInfo"
                placeholder="Enter contact information"
                value={formData.contactInfo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>


        <Row className="mb-3">

          <Col md={6} className="d-flex justify-content-start">
            <Button variant="outline-danger" onClick={handleBack} className='me-2 rounded-pill'>
            <i class="bi bi-arrow-left-circle"></i> Go Back
            </Button>

            <Button variant="dark" type="submit" className='me-2 rounded-pill'> 
            <i class="bi bi-check-circle"></i> Update Post
            </Button>

          </Col>
        </Row>

      </Form>
    </Container>
  );
}

export default EditPost;