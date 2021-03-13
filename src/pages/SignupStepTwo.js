import React from 'react';
import { Container, Button, Col, Image, Form, Alert } from 'react-bootstrap';
import './SignupStepTwo.css';
import Parse from 'parse';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaSignup from '../assets/img/skoda-signup.jpg';
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
      hideAlertIsSameValue: true,
      hideAlertIsExist: true
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
  }

  handleChangeConfirmPwd = (e) => {
    e.preventDefault();
    this.setState({
      confirmUserPwd: e.target.value
    });
  }

  isSameValue = () => {
    let newUserPwd = this.state.newUserPwd.toString();
    let confirmUserPwd = this.state.confirmUserPwd.toString();
    if(newUserPwd !== confirmUserPwd) {
      this.setState({
        hideAlertIsSameValue: false,
        newUserPwd: '',
        confirmUserPwd: ''
      })
    }
    this.signupUser();
  }

  signupUser = () => {
    const user = new Parse.User()
    user.set('username', this.props.sendUserEmail);
    user.set('email', this.props.sendUserEmail);
    user.set('password', this.state.newUserPwd);
    user.set('plateNumber', this.props.sendUserCarPlate)

    user.signUp().then((user) => {
      console.log('User signed up', user);
      window.location = '#/login';
    }).catch(error => {
      console.error('Error while signing up user', error);
      this.setState({
        hideAlertIsSameValue: true,
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
            <span className="myskoda-signup-label">my<span className="letter-green">Skoda</span></span>
            <h4>Create account</h4>
            <span className="step">Step 2</span>
            <p className="text">for My Skoda</p>
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="input-password">
                  <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeInputPwd} value={this.state.newUserPwd} />
                  <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                  <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                </div>
                <Form.Text className="text-muted">
                  Perfect
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <div className="input-password">
                  <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeConfirmPwd} value={this.state.confirmUserPwd} />
                  <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                  <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                </div>
                <Form.Text className="text-muted">
                  Perfect
                </Form.Text>
              </Form.Group>
                <Alert className="error-alert" hidden={this.state.hideAlertIsSameValue} onClose={() => this.setState({hideAlertIsSameValue: true})} dismissible>
                  <p className="m-0">The fields are not the same</p>
                </Alert>
                <Alert className="error-alert" hidden={this.state.hideAlertIsExist} onClose={() => this.setState({hideAlertIsExist: true})} dismissible>
                  <p className="m-0">Account already exists.<br/>Please <a className="signup-link" href="#/login">Login</a></p>
              </Alert>
              <div className="prev-next-buttons">
                <Button className="prev-button" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                <Button className="next-button" variant="success" onClick={this.isSameValue}>Next
                </Button>
              </div>
            </Form>
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
    )
  }
}
export default SignupStepTwo;