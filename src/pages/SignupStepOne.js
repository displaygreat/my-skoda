import React from "react";
import { Container, Col, Image } from "react-bootstrap";
import "./SignupStepOne.css";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import skodaLogo from "../assets/img/skoda-logo.png";
import skodaSignup from "../assets/img/skoda-signup.jpg";
import { SignupFormOne } from "../components/SignupFormOne/SignupFormOne";

const SignupStepOne = (props) => {
  const { handleSignupOne } = props;

  return (
    <div className="p-signup-step-one">
      <Container className="main">
        <Col className="signup-column" xs={12} md={4}>
          <a className="mb-2" href="/#">
            <span className="my-skoda-signup-label">
              my<span className="letter-green">Skoda</span>
            </span>
          </a>
          <h4>Create account</h4>
          <span className="step">Step 1</span>
          <p className="text">for My Skoda</p>
          <SignupFormOne handleSignupOne={handleSignupOne} />
        </Col>
        <Col className="signup-column" xs={12} md={8}>
          <Image className="logo" src={skodaLogo} rounded />
          <div className="signup-img-wrap">
            <Image className="signup-img" src={skodaSignup} rounded />
          </div>
        </Col>
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default SignupStepOne;
