import React from 'react';
import { Container, Button, Col, Image, Form, Alert } from 'react-bootstrap';
import './SignupStepTwo.css';
import Parse from 'parse';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaSignupTwo from '../assets/img/skoda-signup-2.jpg';
import eye from '../assets/img/eye.png';
import eyeOff from '../assets/img/eye-off.png';

class SignupStepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "password",
      offPwd: 'show',
      onPwd: 'hide',
      newUserPwd: '',
      confirmUserPwd: '',
      hideErrorPwd: true,
      hideAlertIsSameValue: true,
      hideAlertIsExist: true,
      hideAlertRequired: true,
      hideAlertSuccess: true,
      buttonNext: 'SignUp'
    }
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

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      newUserPwd: e.target.value
    });
    this.validatePassword(e.target.value);
  }

  handleChangeConfirmPwd = (e) => {
    e.preventDefault();
    this.setState({
      confirmUserPwd: e.target.value
    });
    this.isSameValue(e.target.value);
  }

  validatePassword = (pwd) => {
    let pwdRegex = /(?=.*\d)(?=.*[a-z]).{8,}/;
    let result = pwdRegex.test(pwd);
    if(!result) {
      this.setState({
        hideErrorPwd: false
      })
    }
    if(result) {
      this.setState({
        hideErrorPwd: true
      })
    }
  }

  isSameValue = (confirmUserPwd) => {
    let newUserPwd = this.state.newUserPwd;
    if(newUserPwd !== confirmUserPwd) {
      this.setState({
        hideAlertIsSameValue: false
      })
    }
    if(newUserPwd === confirmUserPwd) {
      this.setState({
        hideAlertIsSameValue: true
      })
    }
  }

  signupUser = () => {
    if (this.state.newUserPwd === '' 
        || this.state.confirmUserPwd === '') {
      this.setState({
        hideAlertRequired: false
      })
      return;
    }
    if (this.state.buttonNext === "LogIn") {
      window.location = "#/login";
    }
    const user = new Parse.User()
    user.set('username', this.props.sendUserEmail);
    user.set('email', this.props.sendUserEmail);
    user.set('password', this.state.newUserPwd);
    user.set('plateNumber', this.props.sendUserCarPlate);
    
    user.signUp().then((user) => {
      console.log('User signed up', user);
      this.setState({
        hideAlertSuccess: false,
        buttonNext: 'LogIn'
      })
    }).catch(error => {
      console.error('Error while signing up user', error);
      this.setState({
        hideAlertIsExist: false,
        newUserPwd: '',
        confirmUserPwd: ''
      })
    });
  }

  handleClickOnBackButton() {
    window.location = '#/signup-step-one';
  }

  render() {
    return(
      <div className="p-signup-step-two">
        <Container className="main">
          <Col className="signup-column" xs={12} md={4}>
            <a className="mb-2" href="/#">
              <span className="my-skoda-signup-label">my<span className="letter-green">Skoda</span></span>
            </a>
            <h4>Create account</h4>
            <span className="step">Step 2</span>
            <p className="text">for My Skoda</p>
            <Form>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <div className="input-password">
                  <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeInputPwd} value={this.state.newUserPwd} />
                  <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                  <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                </div>
                <Form.Text className="text-muted" hidden={this.state.hideErrorPwd}>
                  Password should contain at least one number and one lowercase letter, and at least 8 or more characters
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm password</Form.Label>
                <div className="input-password">
                  <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeConfirmPwd} value={this.state.confirmUserPwd} />
                  <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                  <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                </div>
                <Form.Text className="text-muted" hidden={this.state.hideAlertIsSameValue}>
                  The fields are not the same
                </Form.Text>
              </Form.Group>
                <Alert className="error-alert" hidden={this.state.hideAlertRequired} onClose={() => this.setState({hideAlertRequired: true})} dismissible>
                  <p className="m-0">All fields are requered</p>
                </Alert>
                <Alert variant="success" hidden={this.state.hideAlertSuccess} onClose={() => this.setState({hideAlertSuccess: true})} dismissible>
                  <p className="m-0">Success!<br/>You are signed up.<br/>Please <a className="signup-link" href="#/login">Login</a></p>
                </Alert>
                <Alert className="error-alert" hidden={this.state.hideAlertIsExist} onClose={() => this.setState({hideAlertIsExist: true})} dismissible>
                  <p className="m-0">Account already exists.<br/>Please <a className="signup-link" href="#/login">Login</a></p>
                </Alert>
              <div className="prev-next-buttons">
                <Button className="prev-button" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                <Button className="next-button" variant="success" onClick={this.signupUser}>{this.state.buttonNext}
                </Button>
              </div>
            </Form>
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
    )
  }
}
export default SignupStepTwo;