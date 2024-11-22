// src/components/Feeds.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Collapse } from "react-bootstrap";

function Feeds() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [termsFilter, setTermsFilter] = useState("");

  const [filteredPosts, setFilteredPosts] = useState([]);

  // New state for managing dropdown visibility
  const [openFilters, setOpenFilters] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
      );
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (titleFilter) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((post) =>
        post.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (termsFilter) {
      filtered = filtered.filter(
        (post) => post.terms.toLowerCase() === termsFilter.toLowerCase() // Match
      );
    }

    setFilteredPosts(filtered);
  }, [titleFilter, locationFilter, termsFilter, posts]);

  const resetFilters = () => {
    setTitleFilter("");
    setLocationFilter("");
    setTermsFilter("");
    setFilteredPosts(posts); // Reset
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h1>Feeds</h1>

      {/* Filter Section with Dropdown */}
      <Button 
        variant="secondary" 
        onClick={() => setOpenFilters(!openFilters)} 
        aria-controls="filter-collapse" 
        aria-expanded={openFilters}
        className="mb-3"
      >
        {openFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      <Collapse in={openFilters}>
        <div id="filter-collapse">
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

            <Col>
              <Form.Select
                value={termsFilter}
                onChange={(e) => setTermsFilter(e.target.value)}
              >
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
              <Button variant="primary" onClick={resetFilters}>
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
      </Collapse>

      {filteredPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <Row>
          {filteredPosts.map((post) => (
            <Col md={4} key={post._id}>
              <Card style={{ marginBottom: "20px" }}>
                <Card.Body>
                  <Link
                    to={`/feeds/${post._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                      <i className="bi bi-geo-alt-fill"></i> {post.location}
                    </Card.Text>
                    {/* maximum of 100 characters */}
                    <Card.Text>
                      {post.description.length > 100
                        ? `${post.description.substring(0, 200)}...`
                        : post.description}
                    </Card.Text>
                    <Card.Text>
                      <i className="bi bi-building-fill-exclamation"></i>{" "}
                      {post.terms}
                    </Card.Text>
                    <Card.Text>
                      <i className="bi bi-currency-dollar"></i> {post.salary}
                    </Card.Text>
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