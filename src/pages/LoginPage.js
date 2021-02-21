import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './LoginPage.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import eye from '../assets/img/eye.png';
import eyeOff from '../assets/img/eye-off.png';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaLogin from '../assets/img/skoda-login.jpg';


//solution with json
// import usersJSON from '../data/users.json';

//solution with back4you
import Parse from 'parse';
import UserModel from '../models/UserModel';

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

  handleClickOnBackButton() {
    window.location = '#';
  }

  //solution with json
  // validateEmail = () => {
  //     for(let i=0; i<usersJSON.length; i++) {
  //       if(usersJSON[i].email === this.state.inputEmail) {
  //         window.location = '/#/login';
  //         return;
  //     }
  //     this.props.callbackUserEmail(this.state.inputEmail);
  //   } 
  //     window.location = '/#/signup-license';
  // }
  
  validatePassword = () => {
    let userEmail = this.state.userEmail;
    let userPwd = this.state.userPwd;
    // Pass the username and password to logIn function
    Parse.User.logIn(userEmail, userPwd).then((user) => {
    // Do stuff after successful login
    let carPlate = user.attributes.plateNumber;
    let userId = user.id;
    console.log(userId);
    this.setState({
      userCarPlate: carPlate
    })
    this.props.callbackUserId(userId);
    this.props.callbackUserCarPlate(carPlate);
    console.log(carPlate);
    console.log('Logged in user', user);
    this.props.handleLogin(new UserModel(user));
    window.location = '#/my-skoda';
    }).catch(error => {
      console.error('Error while logging in user', error);

    // !!!write if user not exists(alert)

    this.setState({
        showAlert: false,
        userEmail: '',
        userPwd: ''
    })

    //!!!write validation RegEx for input email and imput password
})
  }

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      userPwd: e.target.value
    });
  }

  handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      userEmail: e.target.value
    });
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
              <span className="myskoda-login-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Login</h4>
              <p className="text">for My Skoda</p>
              <Form>
                <Form.Group className="login-input"controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.userEmail} onChange={this.handleChangeInputEmail}/>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <Form.Group className="login-input" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-password">
                    <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeInputPwd} value={this.state.userPwd} />
                    <Image className={`icon-eye-off ${this.state.offPwd}`} src={eyeOff} onClick={this.showPassword} />
                    <Image className={`icon-eye ${this.state.onPwd}`}  src={eye} onClick={this.hidePassword} />
                  </div>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <a className="login-link" href="https://google.com">Forgot password?</a>
                  <div className="prev-next-buttons">
                  <Button className="login-button btn-prev" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="login-button btn-next" variant="success" onClick={this.validatePassword} >Next
                  </Button>
                </div>
                <div className="error-alert" hidden={this.state.showAlert}>
                <p className="alert-text">Check email and password<br/><em>or</em><br/> <a href="/#/signup-license">Create account</a></p>
                  <button className="button-close" onClick={() => this.setState({showAlert: true})} >
                    &#215;  
                  </button>
                </div>
                <a className="login-link" href="https://google.com">Don't have an account?</a>
                <Button className="welcome-button" variant="success" onClick={this.handleClickOnCreateAccount}>Create account
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