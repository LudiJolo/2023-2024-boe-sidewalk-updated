import React from "react";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import headerImg from "./img/cityLA2.jpg";
import RoverModal from "./roverModal";
import './home.css'
const Home = (props) => {
  const [roverModal, setRoverModal] = useState(false);

  return (
    <div className="home-page">
      <header
        style={{
          backgroundImage: `url(${headerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Sidewalk Data Visualization</h1>
      </header>
      <main className="pb-5">
        <Container>
          {/*Description */}
          <Row className="mt-5">
            <Col
              Col
              md={{ span: 6, offset: 3 }}
              className="text-center mission-section"
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <section>
                <h2>Overview</h2>
                <p style={{ fontStyle: "italic" }}>
                  The Los Angeles City Bureau of Engineering oversees an
                  extensive sidewalk infrastructure encompassing more than
                  11,000 miles. When segments of these sidewalks experience
                  irregular settling or upheaval caused by tree-root growth,
                  they can present safety hazards for pedestrians. Federal ADA
                  standards dictate permissible slopes for sidewalks, and the
                  City of L.A. must adhere to these standards. Adhering to these
                  standards is imperative to ensure accessibility and safety for
                  all.
                </p>
              </section>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <section>
                <h2>About Us</h2>
                <p>
                  We are dedicated to providing a platform where users can
                  upload sidewalk data and visualize it in an interactive way.
                  <br />
                  <br />
                  The collection of sidewalk data is facilitated by the cutting
                  edge-technology of the Ubiquity Magni Rover.
                </p>
                <Button onClick={() => setRoverModal(true)}>View Rover</Button>
              </section>
              <section>
                <h2>How it Works</h2>
                <p>
                  Users can upload their sidewalk data files, which contain
                  Section ID, measurements, images, and GPS coordinates.
                </p>
                <p>
                  Our web application parses the uploaded files and generates
                  visualizations of the sidewalk data.
                </p>
              </section>
            </Col>
            <Col md={6}>
              <section className="text-center">
                <h2>Get Started</h2>
                <p>Ready to visualize your sidewalk data? Get started now!</p>
                <Link to="/display">
                  <Button variant="primary" >
                    Upload Data
                  </Button>
                </Link>
              </section>
            </Col>
          </Row>
        </Container>
        <RoverModal show={roverModal} onHide={() => setRoverModal(false)}/>
      </main>
    </div>
  );
};

export default Home;
