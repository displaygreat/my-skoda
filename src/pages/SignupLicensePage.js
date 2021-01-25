import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './SignupLicensePage.css';

class SignupLicensePage extends React.Component {
  constructor() {
    super();
    this.state = {
      licensePlate: ''
    }
  }

  handleClickOnBackButton() {
    window.location = '/#/welcome';
  }

  handleChangeInputPlate = (e) => {
     e.preventDefault();
     this.setState({
       licensePlate: e.target.value
     })
     console.log(this.state);
  }
  
  getVehicle = async (e) => {
    e.preventDefault();
    let sentPlate = this.state.licensePlate;
    const apiUrl = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${sentPlate}%22]}`);

    const data = await apiUrl.json();
    console.log(data);
    let receivedPlate = data.result.records[0].mispar_rechev;
    if(receivedPlate == sentPlate) {
      this.props.callbackUserCarPlate(sentPlate);
      window.location = '/#/signup';
    }
  }
  render() {
    return(
      <div className="c-welcome-page">
        <div className="main">
        <Container>
          <Row className="">
            <Col className="column column-aside" xs={12} md={4}>
              <span className="myskoda-welcome-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Create account</h4>
              <span className="step">Step 1</span>
              <p className="home-text">for My Skoda</p>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>License plate number</Form.Label>
                  <Form.Control type="text" placeholder="License plate number" onChange={this.handleChangeInputPlate} />
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <div className="prev-next-buttons">
                  <Button className="login-button btn-prev" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="login-button btn-next" variant="success" onClick={this.getVehicle}>Next
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
export default SignupLicensePage;