import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './WelcomePage.css';
import usersJSON from '../data/users.json';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    let users;
    if(localStorage.getItem('usersData')) {
      users = JSON.parse(localStorage.getItem('usersData'))
    } else {
      users = usersJSON;
    }
    this.state = {
      inputEmail: '',
      users: users
    }
  }

  validateEmail = () => {
    if (!localStorage.getItem('usersData')) {
      for(let i=0; i<usersJSON.length; i++) {
        if(usersJSON[i].email === this.state.inputEmail) {
          // this.setState({
          // userEmail: usersJSON[i].email
          // });
          window.location = '/#/login';
          return;
      }
      this.props.callbackUserEmail(this.state.inputEmail);
    } 
    // if (localStorage.getItem('usersData') && this.state.users.email === this.state.inputEmail) {
    //     window.location = '/#/login';
    //     return;
    //   }
      window.location = '/#/signup-license';
    }
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

                {/* <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}
                {/* <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
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