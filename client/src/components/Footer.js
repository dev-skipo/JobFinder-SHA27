// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-light mt-auto py-3">
            <Container>
                <Row className="d-flex flex-wrap justify-content-between align-items-center">
                    <Col md={4} className="text-body-secondary text-center text-md-start">
                        &copy; 2024 Company, Inc
                    </Col>

                    <Col md={4} className="d-flex justify-content-center mb-3 mb-md-0">
                        <a href="/" className="d-flex align-items-center justify-content-center link-body-dark text-decoration-none">
                        <i class="bi bi-triangle"></i>
                        </a>
                    </Col>

                    <Col md={4}>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link href="#" className="px-2 text-body-secondary">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#" className="px-2 text-body-secondary">Features</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#" className="px-2 text-body-secondary">Pricing</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#" className="px-2 text-body-secondary">FAQs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#" className="px-2 text-body-secondary">About</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;