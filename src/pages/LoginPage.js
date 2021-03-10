import React from 'react';
import { Container, Button, Alert, Col, Image, Row, Form } from 'react-bootstrap';
import './LoginPage.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import eye from '../assets/img/eye.png';
import eyeOff from '../assets/img/eye-off.png';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaLogin from '../assets/img/skoda-login.jpg';
import Parse from 'parse';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPwd: '',
      userCarPlate: '',
      type: "password",
      offPwd: 'show',
      onPwd: 'hide',
      showAlert: true
    }
  }

  handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      userEmail: e.target.value
    });
  }

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      userPwd: e.target.value
    });
  }

  showPassword = () => {
    this.setState({
      type: "text",
      offPwd: 'hide',
      onPwd: 'show'
    })
  }

  hidePassword = () => {
    this.setState({
      type: "password",
      offPwd: 'show',
      onPwd: 'hide'
    })
  }
  
  handleSubmit = () => {
    let userEmail = this.state.userEmail;
    let userPwd = this.state.userPwd;
    // Pass the username and password to logIn function
    Parse.User.logIn(userEmail, userPwd).then((user) => {
    // Do stuff after successful login
    console.log('Logged in user', user);
    let carPlate = user.attributes.plateNumber;
    let userEmail = user.attributes.email;
    let userId = user.id;
    this.setState({
      userCarPlate: carPlate
    })
    this.props.callbackUserCarPlate(carPlate);
    this.props.handleLogin(userEmail);
    this.props.callbackUserId(userId);
    window.location = '#/my-skoda';
    }).catch(error => {
      console.error('Error while logging in user', error);
      this.setState({
          showAlert: false,
          userEmail: '',
          userPwd: ''
      })
    })
  }

  handleClickOnBackButton() {
    window.location = '#';
  }

  handleClickOnCreateAccount () {
    window.location = '#/signup-step-one';
  }

  render() {
    return(
      <div className="p-login-page">
        <Container className="main">
          <Row>
            <Col className="login-column" xs={12} md={4}>
              <span className="my-skoda-login-label">my<span className="letter-green">Skoda</span></span>
              <h4>Login</h4>
              <p className="text">for My Skoda</p>
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group className="login-input"controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    required
                    value={this.state.userEmail} 
                    onChange={this.handleChangeInputEmail}/>
                </Form.Group>
                <Form.Group className="login-input" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-password">
                    <Form.Control 
                      type={this.state.type} 
                      placeholder="Password"
                      required
                      value={this.state.userPwd}
                      onChange={this.handleChangeInputPwd} 
                    />
                    <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                    <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                  </div>
                </Form.Group>
                <a className="login-link" href="https://google.com">Forgot password?</a>
                <div className="prev-next-buttons">
                  <Button className="prev-button" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="next-button" variant="success" onClick={this.handleSubmit} >Next
                  </Button>
                </div>
                <Alert className="error-alert" hidden={this.state.showAlert} onClose={() => this.setState({showAlert: true})} dismissible>
                  <p className="m-0">Check email<br/>and password<br/>or <a className="login-link" href="/#/signup-step-one">Create account</a></p>
                </Alert>
                <a className="login-link" href="/#/signup-step-one">Don't have an account?</a>
                <Button className="signup-button" variant="success" onClick={this.handleClickOnCreateAccount}>Create account
                </Button>
              </Form>
            </Col>
            <Col className="login-column" xs={12} md={8}>
              <Image className="logo" src={skodaLogo} rounded />
              <div className="login-img-wrap">
                <Image className="login-img" src={skodaLogin} rounded />
              </div>
            </Col>
          </Row>
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default LoginPage;