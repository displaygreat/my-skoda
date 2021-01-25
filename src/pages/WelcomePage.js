import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './WelcomePage.css';

//solution with json
// import usersJSON from '../data/users.json';

//solution with back4you
import Parse from 'parse';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: ''
    }
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
  

  //solution with back4you
  validateEmail = () => {
    this.props.callbackUserEmail(this.state.inputEmail);
    window.location = '/#/login';
    //!!!write validation RegEx
  }

  handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      inputEmail: e.target.value
    });
  }

  handleClickOnCreateAccount () {
    window.location = '/#/signup-license';
  }

  render() {
    return(
      <div className="c-welcome-page">
        <div className="main">
        <Container>
          <Row className="">
            <Col className="column column-aside" xs={12} md={4}>
              <span className="myskoda-welcome-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Welcome</h4>
              <p className="home-text">for My Skoda</p>
              <Form>
                <Form.Group className="welcome-input"controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.inputEmail} onChange={this.handleChangeInputEmail}/>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <Button className="welcome-button" variant="success" onClick={this.validateEmail} >Next</Button>
                <Button className="welcome-button" variant="outline-success" onClick={this.handleClickOnCreateAccount}>Create account
                </Button>
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
export default WelcomePage;