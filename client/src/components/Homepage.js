import React from "react";
import { Container, Button } from "react-bootstrap";
import "./style/Homepage.css"; // css

function Homepage() {
  return (
    <div>
      <section className="hero bg-light text-center d-flex align-items-center justify-content-center">
        <Container>
          <h1>Welcome to JobFinder</h1>
          <p>Your one-stop solution for finding and posting jobs.</p>
          <Button className="rounded-pill" variant="primary" href="/feeds">
            Search Jobs
          </Button>
        </Container>
      </section>

      <section className="post-job d-flex align-items-center justify-content-center">
        <Container className="text-center">
          <h1>Are You an Employer?</h1>
          <p>Post your job offers and find the right candidates.</p>
          <Button className="rounded-pill" variant="success" href="/post">
            Post a Job
          </Button>
        </Container>
      </section>
    </div>
  );
}

export default Homepage;
