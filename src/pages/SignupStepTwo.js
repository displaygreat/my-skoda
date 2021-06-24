import React from "react";
import "./SignupStepTwo.css";
import { Container, Col, Image } from "react-bootstrap";
import { SignupFormTwo } from "../components/SignupFormTwo/SignupFormTwo";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import skodaLogo from "../assets/img/skoda-logo.png";
import skodaSignupTwo from "../assets/img/skoda-signup-2.jpg";
import { Link } from "react-router-dom";

const SignupStepTwo = () => {
  return (
    <div className="p-signup-step-two">
      <Container className="main">
        <Col className="signup-column" xs={12} md={4}>
          <Link className="mb-2" to="./">
            <span className="my-skoda-signup-label">
              my<span className="letter-green">Skoda</span>
            </span>
          </Link>
          <h4>Create account</h4>
          <span className="step">Step 2</span>
          <p className="text">for My Skoda</p>
          <SignupFormTwo />
        </Col>
        <Col className="signup-column" xs={12} md={8}>
          <Image className="logo" src={skodaLogo} rounded />
          <div className="signup-img-wrap">
            <Image className="signup-img" src={skodaSignupTwo} rounded />
          </div>
        </Col>
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default SignupStepTwo;
