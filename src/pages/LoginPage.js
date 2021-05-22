import React, { useContext, useState } from "react";
import { Container, Button, Alert, Col, Image, Form } from "react-bootstrap";
import "./LoginPage.css";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import AppInfo from "../components/AppInfo/AppInfo";
import eye from "../assets/img/eye.png";
import eyeOff from "../assets/img/eye-off.png";
import skodaLogo from "../assets/img/skoda-logo.png";
import skodaLogin from "../assets/img/skoda-login.jpg";
import UserContext from "../shared/userContext";
import Parse from "parse";
import server from "../shared/server";
import data from "../shared/data";
import { LoginForm } from "../components/LoginForm/LoginForm";

const LoginPage = (props) => {
  const { handleLogIn, getVehicle } = props;
  // const [userEmail, setUserEmail] = useState("");
  // const [userPwd, setUserPwd] = useState("");

  // const [type, setType] = useState("password");
  // const [offPwd, setOffPwd] = useState("show");
  // const [onPwd, setOnPwd] = useState("hide");
  // const [hideAlertReset, setHideAlertReset] = useState(true);
  // const [hideAlertSuccess, setHideAlertSuccess] = useState(true);
  // const [resetPwd, setResetPwd] = useState("");
  // const [hideAlertIsLogin, setHideAlertIsLogin] = useState(true);
  // const [hideAlertRequired, setHideAlertRequired] = useState(true);

  // const activeUser = useContext(UserContext);
  // console.log(activeUser);

  // const handleChangeInputEmail = (e) => {
  //   e.preventDefault();
  //   setHideAlertIsLogin(true);
  //   setHideAlertRequired(true);
  //   setHideAlertSuccess(true);
  //   setUserEmail(e.target.value);
  // };

  // const handleChangeInputPwd = (e) => {
  //   e.preventDefault();
  //   setHideAlertIsLogin(true);
  //   setHideAlertRequired(true);
  //   setHideAlertSuccess(true);
  //   setUserPwd(e.target.value);
  // };

  // const showPassword = () => {
  //   setType("text");
  //   setOffPwd("hide");
  //   setOnPwd("show");
  // };

  // const hidePassword = () => {
  //   setType("password");
  //   setOffPwd("show");
  //   setOnPwd("hide");
  // };

  // const forgotPassword = () => {
  //   setHideAlertReset(false);
  // };

  // const handleChangeInputReset = (e) => {
  //   e.preventDefault();
  //   setResetPwd(e.target.value);
  // };

  // const resetPassword = () => {
  //   let emailResetPwd = resetPwd;
  //   // Pass the username and password to logIn function
  //   Parse.User.requestPasswordReset(emailResetPwd)
  //     .then(() => {
  //       // Password reset request was sent successfully
  //       console.log("Reset password email sent successfully");
  //       setHideAlertReset(true);
  //       setResetPwd("");
  //       setHideAlertSuccess(false);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error while creating request to reset user password",
  //         error
  //       );
  //     });
  // };

  // const handleSubmit = () => {
  //   let email = userEmail;
  //   let pwd = userPwd;
  //   if (email === "" || pwd === "") {
  //     setHideAlertRequired(false);
  //   }

  //   server(email, pwd).then(
  //     (res) => {
  //       console.log(res);
  //       if (!res) {
  //         setHideAlertIsLogin(false);
  //         setUserEmail("");
  //         setUserPwd("");
  //       } else {
  //         handleLogIn(res.attributes);
  //         console.log(res.attributes.plateNumber);
  //         data(res.attributes.plateNumber).then((res) => {
  //           getVehicle(res);
  //         });
  //       }
  //     },
  //     (err) => console.log(err, "error in login: no such user exists")
  //   );
  // };

  // // if (activeUser) {
  // //   window.location = "#/my-skoda";
  // // }

  // const handleClickOnBackButton = () => {
  //   window.location = "#";
  // };

  // const handleClickOnCreateAccount = () => {
  //   window.location = "#/signup-step-one";
  // };

  return (
    <div className="p-login-page">
      <Container className="main">
        <Col className="login-column" xs={12} lg={4}>
          <a className="mb-2" href="/#">
            <span className="my-skoda-login-label">
              my<span className="letter-green">Skoda</span>
            </span>
          </a>
          <h4>Login</h4>
          <p className="text">for My Skoda</p>
          {/* <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="login-input">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={userEmail}
                onChange={handleChangeInputEmail}
              />
            </Form.Group>
            <Form.Group className="login-input">
              <Form.Label>Password</Form.Label>
              <div className="input-password">
                <Form.Control
                  type={type}
                  placeholder="Password"
                  required
                  value={userPwd}
                  onChange={handleChangeInputPwd}
                />
                <Image
                  className={`icon-eye-off ${offPwd}`}
                  src={eyeOff}
                  onClick={showPassword}
                />
                <Image
                  className={`icon-eye ${onPwd}`}
                  src={eye}
                  onClick={hidePassword}
                />
              </div>
            </Form.Group>
            <a className="login-link" href="/#/login" onClick={forgotPassword}>
              Forgot password?
            </a>
            <Alert
              className="error-alert mt-2"
              hidden={hideAlertReset}
              onClose={() => setHideAlertReset(true)}
              dismissible
            >
              <p className="m-0 mb-2">
                To get reset password link, please enter your email
              </p>
              <Form.Group className="login-input">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={resetPwd}
                  onChange={handleChangeInputReset}
                />
              </Form.Group>
              <Button
                className="next-button"
                variant="success"
                onClick={resetPassword}
              >
                Send
              </Button>
            </Alert>
            <Alert
              className="mt-2"
              variant="success"
              hidden={hideAlertSuccess}
              onClose={() => setHideAlertSuccess(true)}
              dismissible
            >
              <p className="m-0">
                Reset password email sent successfully. Check your email to
                reset password
              </p>
            </Alert>
            <div className="prev-next-buttons">
              <Button
                className="prev-button"
                variant="outline-success"
                onClick={handleClickOnBackButton}
              >
                Back
              </Button>
              <Button
                className="next-button"
                variant="success"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
            <Alert
              className="error-alert"
              hidden={hideAlertRequired}
              onClose={() => setHideAlertRequired(true)}
              dismissible
            >
              <p className="m-0">All fields are required</p>
            </Alert>
            <Alert
              className="error-alert"
              hidden={hideAlertIsLogin}
              onClose={() => setHideAlertIsLogin(true)}
              dismissible
            >
              <p className="m-0">
                Check email
                <br />
                and password
                <br />
                or{" "}
                <a className="login-link" href="/#/signup-step-one">
                  Create account
                </a>
              </p>
            </Alert>
            <a className="login-link" href="/#/signup-step-one">
              Don't have an account?
            </a>
            <Button
              className="signup-button"
              variant="success"
              onClick={handleClickOnCreateAccount}
            >
              Create account
            </Button>
          </Form> */}
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
