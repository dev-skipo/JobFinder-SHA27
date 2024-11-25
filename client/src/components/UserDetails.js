import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";

function UserDetails() {
  const { id } = useParams(); // ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]); // State - Storing  Posts

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://jobfinder-sha27.onrender.com/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);

        const postsResponse = await axios.get(
          `https://jobfinder-sha27.onrender.com/api/posts/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(postsResponse.data);
      } catch (err) {
        console.log("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const isLoggedIn = !!localStorage.getItem("token"); // Check

  if (loading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return (
      <Container className="mt-5 py-5">
        <Alert variant="warning">
          Please{" "}
          <Link
            to="/login"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            log in
          </Link>{" "}
          to see this profile.
        </Alert>
      </Container>
    );
  }

  if (!user) return <p>No user found.</p>;

  return (
    <Container className="mt-5 py-5">
      <Row>
        <Col md={8}>
          <h2 className="text-start">
            <i class="bi bi-person-fill"></i> {user.fullName}
          </h2>
          <Card className="mb-4">
            <Card.Body>
              {/*<Card.Title></Card.Title>*/}
              {/*<Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>*/}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>
                    <i class="bi bi-envelope-fill"></i> Contact Information : &nbsp;
                  </strong>{"  "}
                  {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i class="bi bi-geo-alt-fill"></i> <strong>Country : &nbsp;</strong>{" "}
                  {user.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    <i class="bi bi-geo-fill"></i> City : &nbsp;
                  </strong>{" "}
                  {user.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    <i class="bi bi-telephone-fill"></i> Phone Number : &nbsp;
                  </strong>{" "}
                  {user.phoneNumber}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <h2 className="text-start">Related Posts</h2>
          {posts.length === 0 ? (
            <Alert variant="info" className="text-center">
              No posts available.
            </Alert>
          ) : (
            posts.slice(0, 5).map(
              (
                post // Limit (5 Posts)
              ) => (
                <Card key={post._id} className="mb-3">
                  <Card.Body>
                    <Link
                      to={`/feeds/${post._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.location}</Card.Text>
                    </Link>
                  </Card.Body>
                </Card>
              )
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserDetails;
