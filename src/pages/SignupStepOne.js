import React from 'react';
import { Container, Button, Col, Image, Nav, Row, Form } from 'react-bootstrap';
import './SignupStepOne.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaSignup from '../assets/img/skoda-signup.jpg';


class SignupStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userCarPlate: ''
    }
  }

  handleClickOnBackButton() {
    window.location = '#/login';
  }

  handleChangeInputPlate = (e) => {
     e.preventDefault();
     this.setState({
       userCarPlate: e.target.value
     })
  }

   handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      userEmail: e.target.value
    });
  }
  
  getVehicle = async (e) => {
    e.preventDefault();
    let sentPlate = this.state.userCarPlate;
    let sentEmail = this.state.userEmail
    const apiUrl = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${sentPlate}%22]}`);

    const data = await apiUrl.json();
    console.log(data);
    let receivedPlate = data.result.records[0].mispar_rechev;
    if(receivedPlate == sentPlate) {
      this.props.callbackUserCarPlate(sentPlate);
      this.props.callbackUserEmail(sentEmail);
      window.location = '#/signup';
    }
    //!!write if this car plate not exists in database of data.gov.il (alert) + if this car plate exists in database back4app + validation input email RegEx (alert if not valid)
  }

  render() {
    return(
      <div className="p-signup-step-one">
        <div className="main">
        <Container>
          <Row>
            <Col className="signup-column" xs={12} md={4}>
              <span className="myskoda-signup-label">my<span className="letter-green">Skoda</span></span>
              <h4 className="welcome-title">Create account</h4>
              <span className="step">Step 1</span>
              <p className="text">for My Skoda</p>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>License plate number</Form.Label>
                  <Form.Control type="text" placeholder="License plate number" onChange={this.handleChangeInputPlate} />
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <Form.Group className="signup-input"controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.userEmail} onChange={this.handleChangeInputEmail}/>
                  <Form.Text className="text-muted">
                    Perfect
                  </Form.Text>
                </Form.Group>
                <div className="prev-next-buttons">
                  <Button className="signup-button btn-prev" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                  <Button className="signup-button btn-next" variant="success" onClick={this.getVehicle}>Next
                  </Button>
                </div>
              </Form>
            </Col>
            <Col className="signup-column" xs={12} md={8}>
              <Image className="logo" src={skodaLogo}rounded />
              <div className="signup-img-wrap">
                <Image className="signup-img" src={skodaSignup} rounded />
              </div>
            </Col>
          </Row>
          </Container>
          </div>
          <MySkodaFooter />
      </div>
    )
  }
}
export default SignupStepOne;