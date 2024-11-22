// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar({ isLoggedIn, onLogout }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/"><i class="bi bi-triangle"></i> JobFinder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> {/* Aligns items to the right */}
                    <Nav>
                        <Nav.Link as={Link} to="/feeds">Feeds</Nav.Link>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/post">Create Post</Nav.Link>
                                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                                <Nav.Link as={Link} to="#" onClick={onLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;