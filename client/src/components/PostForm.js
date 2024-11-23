import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./style/PostForm.css"; //css

function PostForm() {
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT token - local storage
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Token - headers - authentication
        },
      });
      alert("Post created successfully!");
      navigate("/feeds"); // Redirect
    } catch (error) {
      alert("Failed to create post!");
    }
  };

  return (
    <section className="post-me d-flex align-items-center justify-content-center">
    <Container className="mt-2">
      <h1 className="text-start py-4"><i class="bi bi-sticky-fill"></i> Create Job Post</h1>
      <p className="pb-4 text-muted">Keep it clean when posting a job post</p>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Label>Job Title</Form.Label>
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
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Job Description</Form.Label>
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
          <Col>
            <Form.Group controlId="formRequirement">
              <Form.Label>Job Requirement</Form.Label>
              <Form.Control
                as="textarea"
                name="requirement"
                placeholder="Enter requirements"
                value={formData.requirement}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSalary">
              <Form.Label>Job Salary</Form.Label>
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
          <Col>
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
          <Col>
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
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Job Location</Form.Label>
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
          <Col md={6} className="pb-4">
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

        <Button variant="dark" type="submit">
        <i class="bi bi-plus"></i> Create Post 
        </Button>
      </Form>
    </Container>
    </section>
  );
}

export default PostForm;
