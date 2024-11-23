import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


function NavigationBar({ isLoggedIn, onLogout }) {
  return (
    <Navbar className="fixed-top shadow-sm" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i class="bi bi-triangle text-danger"></i> JobFinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="text-danger me-4" as={Link} to="/feeds">
            <i class="bi bi-rss"></i> Feeds
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/post">
                <i class="bi bi-pencil-fill"></i> Create Post
                </Nav.Link>
                <Nav.Link as={Link} to="/settings">
                Settings
                </Nav.Link>
                <Nav.Link as={Link} to="#" onClick={onLogout}>
                Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                <i class="bi bi-key-fill"></i> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                <i class="bi bi-person-fill"></i> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
