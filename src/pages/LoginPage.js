import React from "react";
import { Container, Col, Image } from "react-bootstrap";
import "./LoginPage.css";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import AppInfo from "../components/AppInfo/AppInfo";
import skodaLogo from "../assets/img/skoda-logo.png";
import skodaLogin from "../assets/img/skoda-login.jpg";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  const { handleLogIn, getVehicle } = props;

  return (
    <div className="p-login-page">
      <Container className="main">
        <Col className="login-column" xs={12} lg={4}>
          <Link className="mb-2" to="./">
            <span className="my-skoda-login-label">
              my<span className="letter-green">Skoda</span>
            </span>
          </Link>
          <h4>Login</h4>
          <p className="text">for My Skoda</p>
          <LoginForm handleLogIn={handleLogIn} getVehicle={getVehicle} />
        </Col>
        <Col className="login-column" xs={12} lg={8}>
          <Image className="logo" src={skodaLogo} rounded />
          <div className="login-img-wrap">
            <Image className="login-img" src={skodaLogin} rounded />
          </div>
        </Col>
        <AppInfo />
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default LoginPage;
