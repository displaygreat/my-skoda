import React from "react";
import "./HomePage.css";
import { Container, Col, Image, Row, Button } from "react-bootstrap";
import MySkodaFooter from "../../components/MySkodaFooter/MySkodaFooter";
import skodaBlack from "../../assets/img/skoda-black-logo.jpg";
import skodaLogo from "../../assets/img/skoda-logo.png";
import chevronRight from "../../assets/img/chevron-right.png";
import { useHistory, Link } from "react-router-dom";

const HomePage = () => {
  let history = useHistory();

  return (
    <div className="p-home-page">
      <Container className="main">
        <Row>
          <Col className="home-column" xs={12} md={8} lg={7}>
            <Link className="mb-2" to="./">
              <span className="home-label">
                my<span className="letter-green">Skoda</span>
              </span>
            </Link>
            <Image className="home-img" src={skodaBlack} rounded />
          </Col>
          <Col
            className="home-column"
            xs={12}
            md={4}
            lg={{ span: 4, offset: 1 }}
          >
            <Image className="logo" src={skodaLogo} rounded />
            <h4 className="home-subtitle">Welcome to My Skoda!</h4>
            <p className="home-text">
              mySkoda gives you access to all the digital services from Skoda.
              Access important vehicle data, manage your data, and set up
              services.
            </p>
            <Button
              className="home-button"
              variant="success"
              onClick={() => {
                history.push("./login");
              }}
            >
              Let's go
              <Image src={chevronRight} />
            </Button>
          </Col>
        </Row>
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default HomePage;
