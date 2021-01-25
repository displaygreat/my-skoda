import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form, Alert } from 'react-bootstrap';
import './LoginPage.css';
import usersJSON from '../data/users.json';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      type: "password",
      offPwd: 'show',
      onPwd: 'hide',
      userPwd: '',
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
    window.location = '/#/welcome';
  }

  validatePassword = () => {
    let getUserEmail = this.props.sendUserEmail;
    let getUserPwd = this.state.userPwd;
    for(let i=0; i<usersJSON.length; i++) {
      if(usersJSON[i].email === getUserEmail && usersJSON[i].pwd === getUserPwd ) {
        window.location = '/#/my-skoda';
        return;
      } 
    }
    this.setState({
      showAlert: false,
      userPwd: ''
    })
  }

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      userPwd: e.target.value
    });
    console.log(this.state);
  }

  render() {
    return(
      <div className="c-welcome-page">
        <div className="main">
        <Container>
          <Row className="">
            <Col className="column column-aside" xs={12} md={4}>
              <div class="alert alert-warning alert-wrap" role="alert" hidden={this.state.showAlert}>
                <p className="alert-text">Invalid Password</p>
                  <button className="button-close" onClick={() => this.setState({showAlert: true})} >
                    &#215;  
                  </button>
              </div>
              <span className="myskoda-welcome-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Login</h4>
              <p className="home-text">for My Skoda</p>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-password">
                    <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeInputPwd} value={this.state.userPwd} />
                    <Image className={`icon-eye-off ${this.state.offPwd}`} src="img/eye-off.png" onClick={this.showPassword} />
                    <Image className={`icon-eye ${this.state.onPwd}`}  src="img/eye.png" onClick={this.hidePassword} />
                  </div>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <div className="prev-next-buttons">
                  <Button className="login-button btn-prev" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="login-button btn-next" variant="success" onClick={this.validatePassword} >Next
                  </Button>
                </div>
                <a className="login-link" href="https://google.com">Forgot password?</a>
              </Form>
            </Col>
            <Col className="column column-aside" xs={12} md={8}>
              <Image className="logo welcome-logo" src="img/skoda-logo-min.png" rounded />
              <div className="wrap-welcome-img">
                <Image className="home-img" src="img/skoda-welcome-martin-katlerI-unsplash-min.jpg" rounded />
              </div>
            </Col>
          </Row>
          </Container>
          </div>
          <Row className="footer">
            <Container>
            <Nav as="ul">
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="#">Terms of use</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="#">Contacts</Nav.Link>
              </Nav.Item>
            </Nav>
            </Container>
          </Row>
      </div>
    )
  }
}
export default LoginPage;