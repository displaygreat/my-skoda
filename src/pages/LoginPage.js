import React from 'react';
import { Container, Button, Alert, Col, Image, Form } from 'react-bootstrap';
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
      hideAlertReset: true,
      hideAlertSuccess: true,
      resetPwd: '',
      hideAlertIsLogin: true,
      hideAlertRequired: true
    }
  }

  handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      hideAlertIsLogin: true,
      hideAlertRequired: true,
      hideAlertSuccess: true,
      userEmail: e.target.value
    });
  }

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      hideAlertIsLogin: true,
      hideAlertRequired: true,
      hideAlertSuccess: true,
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

  forgotPassword = () => {
    this.setState({
      hideAlertReset: false
    })
  }

  handleChangeInputReset = (e) => {
    e.preventDefault();
    this.setState({
      resetPwd: e.target.value
    })
  }

  resetPassword = () => {
    let emailResetPwd = this.state.resetPwd;
    // Pass the username and password to logIn function
    Parse.User.requestPasswordReset(emailResetPwd).then(() => {
      // Password reset request was sent successfully
      console.log('Reset password email sent successfully');
      this.setState({
        hideAlertReset: true,
        resetPwd: '',
        hideAlertSuccess: false
      })
    }).catch((error) => {
      console.error('Error while creating request to reset user password', error);
    })
  }
  
  handleSubmit = () => {
    let userEmail = this.state.userEmail;
    let userPwd = this.state.userPwd;
    if (userEmail === '' || userPwd === '') {
      this.setState({
        hideAlertRequired: false
      })
      return;
    }
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
          hideAlertIsLogin: false,
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
          <Col className="login-column" xs={12} lg={4}>
            <span className="my-skoda-login-label">my<span className="letter-green">Skoda</span></span>
            <h4>Login</h4>
            <p className="text">for My Skoda</p>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Group className="login-input">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  required
                  value={this.state.userEmail} 
                  onChange={this.handleChangeInputEmail}/>
              </Form.Group>
              <Form.Group className="login-input">
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
              <a className="login-link" href="/#/login" onClick={this.forgotPassword}>Forgot password?</a>
              <Alert className="error-alert mt-2" hidden={this.state.hideAlertReset} onClose={() => this.setState({hideAlertReset: true})} dismissible>
                <p className="m-0 mb-2">To get reset password link, please enter your email</p>
                <Form.Group className="login-input">
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  required
                  value={this.state.resetPwd} 
                  onChange={this.handleChangeInputReset}/>
                </Form.Group>
                <Button className="next-button" variant="success" onClick={this.resetPassword} >Next
                </Button>
              </Alert>
              <Alert className="mt-2" variant="success" hidden={this.state.hideAlertSuccess} onClose={() => this.setState({hideAlertSuccess: true})} dismissible>
                <p className="m-0">Reset password email sent successfully. Check your email to reset password</p>
              </Alert>
              <div className="prev-next-buttons">
                <Button className="prev-button" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                <Button className="next-button" variant="success" onClick={this.handleSubmit} >Next
                </Button>
              </div>
              <Alert className="error-alert" hidden={this.state.hideAlertRequired} onClose={() => this.setState({hideAlertRequired: true})} dismissible>
                <p className="m-0">All fields are required</p>
              </Alert>
              <Alert className="error-alert" hidden={this.state.hideAlertIsLogin} onClose={() => this.setState({hideAlertIsLogin: true})} dismissible>
                <p className="m-0">Check email<br/>and password<br/>or <a className="login-link" href="/#/signup-step-one">Create account</a></p>
              </Alert>
              <a className="login-link" href="/#/signup-step-one">Don't have an account?</a>
              <Button className="signup-button" variant="success" onClick={this.handleClickOnCreateAccount}>Create account
              </Button>
            </Form>
          </Col>
          <Col className="login-column" xs={12} lg={8}>
            <Image className="logo" src={skodaLogo} rounded />
            <div className="login-img-wrap">
              <Image className="login-img" src={skodaLogin} rounded />
            </div>
          </Col>
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default LoginPage;