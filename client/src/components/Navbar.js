// src/components/NavigationBar.js
import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext'; // Import Theme-Context

function NavigationBar({ isLoggedIn, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme 

  return (
    <Navbar className={`fixed-top shadow-sm ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-triangle text-danger"></i> JobFinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="text-danger me-4" as={Link} to="/feeds">
              <i className="bi bi-rss"></i> Feeds
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/post">
                  <i className="bi bi-pencil-fill"></i> Create Post
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
                  <i className="bi bi-key-fill"></i> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-person-fill"></i> Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* toggle themes */}
          <button onClick={toggleTheme} style={{ marginLeft: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>
            {theme === 'light' ? '🌙' : '☀️'} {/* Emoji Better*/}
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;