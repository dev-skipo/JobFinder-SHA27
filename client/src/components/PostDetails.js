import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jobfinder-sha27.onrender.com/api/posts/${id}`
        );
        setPost(response.data);

        const relatedResponse = await axios.get(
          `https://jobfinder-sha27.onrender.com/api/posts/user/${response.data.userId._id}`
        );
        setRelatedPosts(relatedResponse.data);
      } catch (err) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const token = localStorage.getItem("token"); // Token - local storage
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null; // Decode Token - user ID

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found.</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jobfinder-sha27.onrender.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token - headers - authentication
        },
      });
      alert("Post deleted successfully!");
      navigate("/feeds"); // Redirect
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <Container className="mt-5 py-5">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="px-1 fs-1 py-2">{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted p-2">
                Posted By: &nbsp;
                {post.userId ? (
                  <Link
                    to={`/user/${post.userId._id}`}
                    style={{ color: "red", textDecoration: "none" }}
                  >
                    {post.userId.fullName}
                  </Link>
                ) : (
                  " Unknown User"
                )}
              </Card.Subtitle>
              <Card.Text
                className="text-dark"
                style={{
                  padding: "10px", 
                  lineHeight: "1.5", 
                  whiteSpace: "pre-line", 
                }}
              >
                {post.description}
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="text-muted"
                  style={{
                    padding: "10px", 
                    lineHeight: "1.5", 
                    whiteSpace: "pre-line", 
                  }}
                >
                  <strong>Requirement:</strong> <br /> {post.requirement}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-dark">Salary :</strong> {post.salary}{" "}
                  $
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-dark">Position :</strong>{" "}
                  {post.position}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-dark">Terms :</strong> {post.terms}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-danger">Location :</strong>{" "}
                  {post.location}
                </ListGroup.Item>
              </ListGroup>

              {token ? (
                <>
                  {post.userId && post.userId._id === userId && (
                    <>
                      <br />
                      <Button
                        variant="outline-dark"
                        className="rounded-pill border-3 me-1"
                        onClick={() => navigate(`/edit-post/${id}`)}
                      >
                        <i class="bi bi-pencil-fill"></i> Edit Post
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        className="rounded-pill border-3"
                        onClick={() => setShowModal(true)}
                      >
                        <i class="bi bi-trash3-fill"></i> Delete Post
                      </Button>
                    </>
                  )}
                  <p className="px-3 pt-4">
                    <strong>
                      <i className="bi bi-envelope-check-fill"></i> Contact Info
                      :{" "}
                    </strong>
                    <a
                      href={
                        post.contactInfo.includes("@")
                          ? `mailto:${post.contactInfo}` // Email
                          : post.contactInfo.startsWith("http")
                          ? post.contactInfo // URL
                          : post.contactInfo.startsWith("+") ||
                            post.contactInfo.startsWith("0")
                          ? `tel:${post.contactInfo}` // Phone number
                          : "#"
                      }
                      style={{ textDecoration: "none", color: "red" }}
                    >
                      &nbsp; {post.contactInfo}
                    </a>
                  </p>
                </>
              ) : (
                <Alert variant="danger">
                  <strong>Contact Info :</strong>
                  <Link
                    to="/login"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    &nbsp; Login
                  </Link>
                  &nbsp; to see contact information
                </Alert>
              )}

              <p className="mt-3">
                <small>
                  Posted at: {new Date(post.postedAt).toLocaleString()}
                </small>
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <h2 className="text-start">Related Posts</h2>
          {relatedPosts.length === 0 ? (
            <Alert variant="info" className="text-center">
              No related posts available.
            </Alert>
          ) : (
            relatedPosts.slice(0, 5).map(
              (
                relatedPost // Limit to 5 posts
              ) => (
                <Card key={relatedPost._id} className="mb-3">
                  <Card.Body>
                    <Link
                      to={`/feeds/${relatedPost._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card.Title>{relatedPost.title}</Card.Title>
                      {/* maximum of 100 characters */}
                      <Card.Text>
                        {relatedPost.description.length > 100
                          ? `${relatedPost.description.substring(0, 150)}...`
                          : relatedPost.description}
                      </Card.Text>
                    </Link>
                  </Card.Body>
                </Card>
              )
            )
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
              setShowModal(false);
            }}
          >
            Delete Forever
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PostDetails;
