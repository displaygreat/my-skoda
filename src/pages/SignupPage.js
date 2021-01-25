import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './SignupPage.css';

class SignupPage extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "password",
      offPwd: 'show',
      onPwd: 'hide',
      newUserPwd: '',
      confirmUserPwd: '',
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
    window.location = '/#/signup-license';
  }

  handleChangeInputPwd = (e) => {
    e.preventDefault();
    this.setState({
      newUserPwd: e.target.value
    });
    console.log(this.state);
  }

  handleChangeConfirmPwd = (e) => {
    e.preventDefault();
    this.setState({
      confirmUserPwd: e.target.value
    });
    console.log(this.state);
  }

  isTheSameValue = () => {
    if(this.state.newUserPwd === this.state.confirmUserPwd) {
       window.location = '/#/my-skoda'
    }
    this.setState({
      showAlert: false,
      newUserPwd: '',
      confirmUserPwd: ''
    })
  }


  render() {
    return(
      <div className="c-welcome-page">
        <div className="main">
        <Container>
          <Row className="">
            <Col className="column column-aside" xs={12} md={4}>
              <div class="alert alert-warning alert-wrap" role="alert" hidden={this.state.showAlert}>
                <p className="alert-text">The fields are not the same</p>
                  <button className="button-close" onClick={() => this.setState({showAlert: true})} >
                    &#215;  
                  </button>
              </div>
              <span className="myskoda-welcome-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Create account</h4>
              <span className="step">Step 2</span>
              <p className="home-text">for My Skoda</p>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-password">
                    <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeInputPwd} value={this.state.newUserPwd} />
                    <Image className={`icon-eye-off ${this.state.offPwd}`} src="img/eye-off.png" onClick={this.showPassword} />
                    <Image className={`icon-eye ${this.state.onPwd}`}  src="img/eye.png" onClick={this.hidePassword} />
                  </div>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <div className="input-password">
                    <Form.Control type={this.state.type} placeholder="Password" onChange={this.handleChangeConfirmPwd} value={this.state.confirmUserPwd} />
                    <Image className={`icon-eye-off ${this.state.offPwd}`} src="img/eye-off.png" onClick={this.showPassword} />
                    <Image className={`icon-eye ${this.state.onPwd}`}  src="img/eye.png" onClick={this.hidePassword} />
                  </div>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <div className="prev-next-buttons">
                  <Button className="login-button btn-prev" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="login-button btn-next" variant="success" onClick={this.isTheSameValue}>Next
                  </Button>
                </div>
              </Form>
            </Col>
            <Col className="column column-aside" xs={12} md={8}>
              <Image className="logo welcome-logo" src="img/skoda-logo-min.png" rounded />
              <div className="wrap-welcome-img">
                <Image className="home-img" src="img/signup-kristian-valco-unsplash-min.jpg" rounded />
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
export default SignupPage;